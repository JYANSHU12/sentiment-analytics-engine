import os
import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

def train_model():
    # Sample training corpus representing customer feedback
    data = {
        "text": [
            "Great service, extremely happy with the support!",
            "Fast delivery and excellent quality products.",
            "Loved the overall experience, highly recommended.",
            "Worst customer support ever, completely unresponsive.",
            "Product broke on the first day, terrible quality.",
            "Horrible experience, I want a full refund.",
            "The product is average, nothing special.",
            "It works as expected, decent standard performance.",
            "It is fine, neither good nor bad."
        ],
        "sentiment": [
            "positive", "positive", "positive",
            "negative", "negative", "negative",
            "neutral", "neutral", "neutral"
        ]
    }
    df = pd.DataFrame(data)
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(ngram_range=(1, 2), stop_words='english')),
        ('clf', LogisticRegression(random_state=42))
    ])
    pipeline.fit(df['text'], df['sentiment'])

    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, 'sentiment_model.pkl')
    joblib.dump(pipeline, model_path)
    
    # Also save to current directory if running from elsewhere
    if os.path.abspath(os.getcwd()) != os.path.abspath(current_dir):
        try:
            joblib.dump(pipeline, 'sentiment_model.pkl')
        except Exception:
            pass

    print(f"Model trained and saved as {model_path}")
    return pipeline

if __name__ == "__main__":
    train_model()
