import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Load model and data
model = joblib.load('fraud_detection_model.pkl')
df = pd.read_csv('../AI_Based_Medical_Insurance_Claim_Fraud_Detection_Dataset.csv')

# Preprocessing
target = df['fraud_label']
df_ml = df.drop(columns=['claim_id', 'fraud_label'])
df_ml['unapproved_ratio'] = (df_ml['claim_amount'] - df_ml['approved_amount']) / (df_ml['claim_amount'] + 1)

le = LabelEncoder()
cat_cols = df_ml.select_dtypes(include=['object']).columns
for col in cat_cols:
    df_ml[col] = le.fit_transform(df_ml[col].astype(str))

# Prediction
preds = model.predict(df_ml)
probs = model.predict_proba(df_ml)[:, 1]

# Combine
results = pd.DataFrame({'actual': target, 'pred': preds, 'prob': probs})

# Find top fraud cases (Highest probability)
fraud_cases = results[results['pred'] == 1].sort_values(by='prob', ascending=False)
print("Top 5 Fraud Predictions:")
print(fraud_cases.head(5))

# Get features for top case
top_idx = fraud_cases.index[0]
print("\nTop Case Features:")
print(df.iloc[top_idx])
