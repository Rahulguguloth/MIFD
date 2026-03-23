from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os

app = FastAPI(title="Medical Insurance Fraud Detection API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
MODEL_PATH = "fraud_detection_model.pkl"
try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

class ClaimData(BaseModel):
    age: int
    gender: str
    claim_amount: float
    approved_amount: float
    hospital_type: str
    treatment_category: str

# Mappings (Matching alphabetical LabelEncoder behavior)
GENDER_MAP = {"Female": 0, "Male": 1}
HOSPITAL_MAP = {"Government": 0, "Private": 1}
TREATMENT_MAP = {"Consultation": 0, "Emergency": 1, "Surgery": 2, "Therapy": 3}

@app.post("/predict")
async def predict(data: ClaimData):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:
        # 1. Feature Engineering
        unapproved_ratio = (data.claim_amount - data.approved_amount) / (data.claim_amount + 1)
        
        # 2. Encoding categorical inputs
        gender_enc = GENDER_MAP.get(data.gender, 0)
        hospital_enc = HOSPITAL_MAP.get(data.hospital_type, 1)
        treatment_enc = TREATMENT_MAP.get(data.treatment_category, 0)
        
        # 3. Handle model features (Filling defaults for features not in the form)
        # Features expected by model:
        # ['patient_age', 'patient_gender', 'hospital_type', 'treatment_category', 'diagnosis_code', 
        #  'claim_amount', 'approved_amount', 'hospital_stay_days', 'previous_claims_count', 
        #  'policy_tenure_years', 'claim_submission_delay_days', 'high_risk_procedure_flag', 
        #  'document_mismatch_flag', 'anomaly_score', 'unapproved_ratio']
        
        input_data = {
            "patient_age": data.age,
            "patient_gender": gender_enc,
            "hospital_type": hospital_enc,
            "treatment_category": treatment_enc,
            "diagnosis_code": 100,  # Intermediate neutral code
            "claim_amount": data.claim_amount,
            "approved_amount": data.approved_amount,
            "hospital_stay_days": 15 if unapproved_ratio > 0.6 else 4, 
            "previous_claims_count": 5 if unapproved_ratio > 0.7 else 1, 
            "policy_tenure_years": 2,
            "claim_submission_delay_days": 20 if unapproved_ratio > 0.5 else 2,
            "high_risk_procedure_flag": 1 if unapproved_ratio > 0.8 else 0,
            "document_mismatch_flag": 1 if unapproved_ratio > 0.7 else 0,
            "anomaly_score": min(0.99, unapproved_ratio + 0.1), # Map to ratio for realistic fraud signal
            "unapproved_ratio": unapproved_ratio
        }
        
        # Create DataFrame to match feature order
        # Get feature names from model if possible
        try:
            expected_features = model.get_booster().feature_names
        except:
            # Fallback to hardcoded list if names not available in pkl
            expected_features = [
                'patient_age', 'patient_gender', 'hospital_type', 'treatment_category', 'diagnosis_code',
                'claim_amount', 'approved_amount', 'hospital_stay_days', 'previous_claims_count',
                'policy_tenure_years', 'claim_submission_delay_days', 'high_risk_procedure_flag',
                'document_mismatch_flag', 'anomaly_score', 'unapproved_ratio'
            ]
        
        df_input = pd.DataFrame([input_data])[expected_features]
        
        # 4. Predict
        prediction = int(model.predict(df_input)[0])
        probability = float(model.predict_proba(df_input)[0][1])
        
        # Simple explanation logic
        explanation = "High unapproved amount ratio detected." if unapproved_ratio > 0.5 else "Claim patterns appear typical."
        if prediction == 1:
            if unapproved_ratio > 0.7:
                explanation = "Extremely high mismatch between claimed and approved amounts."
            elif data.age > 70 and data.claim_amount > 100000:
                explanation = "High cost claim for senior patient flagged for review."
            else:
                explanation = "Statistical anomalies detected in claim details."
        else:
            explanation = "No major clinical or financial red flags detected."

        return {
            "prediction": "Fraud" if prediction == 1 else "Genuine",
            "probability": round(probability, 2),
            "explanation": explanation
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
