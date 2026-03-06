import json
import csv
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report
import joblib

# Load real dataset from CSV
rows = []
with open("./data/IT Support Ticket Data.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row["Body"].strip():  # skip empty rows
            rows.append(row)

texts = [r["Body"] for r in rows]
departments = [r["Department"] for r in rows]
priorities = [r["Priority"].capitalize() for r in rows]  # low -> Low, high -> High

# Derive SLA risk from priority
def assign_sla_risk(priority):
    if priority == "High":
        return "High"
    return "Low"

sla_risks = [assign_sla_risk(p) for p in priorities]

def train_model(texts, labels, label_name):
    X_train, X_test, y_train, y_test = train_test_split(
        texts, labels, test_size=0.2, random_state=42, stratify=labels
    )

    model = Pipeline([
        ('tfidf', TfidfVectorizer(
            ngram_range=(1, 2),
            max_features=10000,
            sublinear_tf=True
        )),
        ('clf', RandomForestClassifier(
            n_estimators=200,
            min_samples_leaf=2,
            random_state=42,
            n_jobs=-1
        ))
    ])

    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    print(f"\n=== {label_name} Model ===")
    print(classification_report(y_test, y_pred))

    cv_scores = cross_val_score(model, texts, labels, cv=5)
    print(f"Cross-validation accuracy: {cv_scores.mean():.2f} (+/- {cv_scores.std():.2f})")

    return model

category_model = train_model(texts, departments, "Category")
priority_model  = train_model(texts, priorities, "Priority")
sla_model       = train_model(texts, sla_risks, "SLA Breach Risk")

joblib.dump(category_model, "category_model.pkl")
joblib.dump(priority_model, "priority_model.pkl")
joblib.dump(sla_model,      "sla_model.pkl")

print("\nAll models saved.")