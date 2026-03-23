import pandas as pd
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv('../AI_Based_Medical_Insurance_Claim_Fraud_Detection_Dataset.csv')

# Preprocessing same as training
df_ml = df.drop(columns=['claim_id', 'fraud_label'])
le = LabelEncoder()
cat_cols = df_ml.select_dtypes(include=['object']).columns
for col in cat_cols:
    df_ml[col] = le.fit_transform(df_ml[col].astype(str))

# Print the 1503 case (which was correctly flagged as fraud)
row = df_ml.iloc[1503]
print("Case 1503 encoded values:")
print(row.to_dict())
