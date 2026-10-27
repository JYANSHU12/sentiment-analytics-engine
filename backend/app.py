from flask import Flask, request, jsonify
from flask_cors import CORS
from sentiment_engine import SentimentEngine
from model_trainer import train_model
import os

app = Flask(__name__)
CORS(app)

current_dir = os.path.dirname(os.path.abspath(__file__))
model_file = os.path.join(current_dir, 'sentiment_model.pkl')

if not os.path.exists(model_file) and not os.path.exists('sentiment_model.pkl'):
    train_model()

engine = SentimentEngine(model_file if os.path.exists(model_file) else 'sentiment_model.pkl')
feedback_history = []

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json or {}
    text = data.get('text', '').strip()
    if not text:
        return jsonify({"status": "error", "message": "Text payload is empty"}), 400
    result = engine.analyze_text(text)
    feedback_history.append(result)
    return jsonify({"status": "success", "result": result})

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    total = len(feedback_history)
    if total == 0:
        return jsonify({
            "total": 0,
            "counts": {"positive": 0, "negative": 0, "neutral": 0},
            "history": []
        })
    counts = {"positive": 0, "negative": 0, "neutral": 0}
    for item in feedback_history:
        sentiment = item["sentiment"]
        counts[sentiment] = counts.get(sentiment, 0) + 1
    return jsonify({
        "total": total,
        "counts": counts,
        "history": list(reversed(feedback_history[-20:]))
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)
