# Real-Time Customer Sentiment Analytics Engine

A full-stack, real-time sentiment analytics dashboard that processes customer feedback, predicts sentiment categories (Positive, Neutral, Negative) along with confidence scores, and visualizes live sentiment metrics and activity streams.

---

## 🚀 Features

- **Real-Time Sentiment Classification**: Evaluates customer reviews and feedback instantly using a Scikit-Learn TF-IDF + Logistic Regression model.
- **Confidence Scoring & Probability Breakdown**: Calculates class probabilities for Positive, Neutral, and Negative sentiments.
- **Interactive Live Dashboard**: Built with React, providing dynamic submission forms, visual distribution bars, and live activity feeds.
- **RESTful Flask API**: Clean backend architecture serving prediction endpoints (`/api/analyze`) and real-time statistics (`/api/analytics`).
- **Auto-Model Bootstrapping**: Automatically trains and generates the model artifact on startup if not already present.

---

## 🛠️ Project Structure

```
sentiment-analytics-engine/
│
├── backend/
│   ├── app.py                # Flask application & REST API routes
│   ├── model_trainer.py      # TF-IDF + Logistic Regression training pipeline
│   ├── sentiment_engine.py   # Prediction & inference engine class
│   └── requirements.txt      # Python dependencies
│
└── frontend/
    ├── public/
    │   └── index.html        # HTML page template
    ├── src/
    │   ├── App.js            # Main dashboard component
    │   ├── App.css           # Modern dark-mode styling
    │   └── index.js          # React entry point
    └── package.json          # Node dependencies & scripts
```

---

## 📦 Setup & Execution

### 1. Backend Setup (Flask & Scikit-Learn)

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Train the model (optional; `app.py` auto-generates if missing):
   ```bash
   python model_trainer.py
   ```
5. Run the Flask server:
   ```bash
   python app.py
   ```
   *The backend will be running at `http://localhost:5001`.*

---

### 2. Frontend Setup (React)

1. Open another terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The frontend will launch at `http://localhost:3000`.*

---

## 📡 API Reference

### `POST /api/analyze`
Submits feedback text for sentiment analysis.

- **Request Body:**
  ```json
  {
    "text": "Great service, extremely happy with the support!"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "result": {
      "text": "Great service, extremely happy with the support!",
      "sentiment": "positive",
      "confidence": 0.6512,
      "probabilities": {
        "negative": 0.1234,
        "neutral": 0.2254,
        "positive": 0.6512
      }
    }
  }
  ```

### `GET /api/analytics`
Fetches aggregate sentiment counts and recent submission history.

- **Response:**
  ```json
  {
    "total": 1,
    "counts": {
      "positive": 1,
      "neutral": 0,
      "negative": 0
    },
    "history": [ ... ]
  }
  ```

---

## 📄 License
This project is licensed under the MIT License.
