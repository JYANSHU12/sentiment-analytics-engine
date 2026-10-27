import os
import joblib

class SentimentEngine:
    def __init__(self, model_path=None):
        if model_path is None:
            # Check default path in same directory as this file, or current directory
            current_dir = os.path.dirname(os.path.abspath(__file__))
            default_path = os.path.join(current_dir, 'sentiment_model.pkl')
            if os.path.exists(default_path):
                model_path = default_path
            elif os.path.exists('sentiment_model.pkl'):
                model_path = 'sentiment_model.pkl'
            else:
                model_path = default_path

        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file {model_path} not found. Run model_trainer.py first.")
        self.model = joblib.load(model_path)

    def analyze_text(self, text):
        prediction = self.model.predict([text])[0]
        probabilities = self.model.predict_proba([text])[0]
        classes = self.model.classes_
        prob_dict = {cls: round(float(prob), 4) for cls, prob in zip(classes, probabilities)}
        return {
            "text": text,
            "sentiment": prediction,
            "confidence": prob_dict.get(prediction, 0.0),
            "probabilities": prob_dict
        }
