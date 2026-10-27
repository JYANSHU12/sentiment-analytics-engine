import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = 'http://localhost:5001/api';

function App() {
  const [inputText, setInputText] = useState('');
  const [currentResult, setCurrentResult] = useState(null);
  const [analytics, setAnalytics] = useState({
    total: 0,
    counts: { positive: 0, negative: 0, neutral: 0 },
    history: []
  });

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${API_BASE}/analytics`);
      setAnalytics(res.data);
    } catch (err) {
      console.error('Failed to fetch analytics', err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    try {
      const res = await axios.post(`${API_BASE}/analyze`, { text: inputText });
      if (res.data.status === 'success') {
        setCurrentResult(res.data.result);
        setInputText('');
        fetchAnalytics();
      }
    } catch (err) {
      console.error('Error analyzing sentiment', err);
    }
  };

  const getPercentage = (count) => {
    if (!analytics.total) return 0;
    return Math.round((count / analytics.total) * 100);
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Real-Time Customer Sentiment Analytics Engine</h1>
      </header>

      <div className="grid-layout">
        <div className="card input-card">
          <h2>Submit Feedback</h2>
          <form onSubmit={handleAnalyze}>
            <textarea
              placeholder="Paste customer feedback, review, or comment here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
            />
            <button type="submit" className="btn-primary">
              Analyze Sentiment
            </button>
          </form>

          {currentResult && (
            <div className={`result-box ${currentResult.sentiment}`}>
              <h3>
                Result: <span className="badge">{currentResult.sentiment.toUpperCase()}</span>
              </h3>
              <p>Confidence: {(currentResult.confidence * 100).toFixed(1)}%</p>
              <div className="prob-breakdown">
                <small>Pos: {(currentResult.probabilities?.positive ? (currentResult.probabilities.positive * 100).toFixed(1) : 0)}% | </small>
                <small>Neu: {(currentResult.probabilities?.neutral ? (currentResult.probabilities.neutral * 100).toFixed(1) : 0)}% | </small>
                <small>Neg: {(currentResult.probabilities?.negative ? (currentResult.probabilities.negative * 100).toFixed(1) : 0)}%</small>
              </div>
            </div>
          )}
        </div>

        <div className="card metrics-card">
          <h2>Analytics Overview</h2>
          <div className="total-stat">
            <p>Total Submissions</p>
            <h3>{analytics.total}</h3>
          </div>
          <div className="stat-bars">
            <div className="stat-row">
              <span>Positive</span>
              <div className="bar-bg">
                <div
                  className="bar-fill positive-bg"
                  style={{ width: `${getPercentage(analytics.counts?.positive || 0)}%` }}
                ></div>
              </div>
              <span>
                {analytics.counts?.positive || 0} ({getPercentage(analytics.counts?.positive || 0)}%)
              </span>
            </div>
            <div className="stat-row">
              <span>Neutral</span>
              <div className="bar-bg">
                <div
                  className="bar-fill neutral-bg"
                  style={{ width: `${getPercentage(analytics.counts?.neutral || 0)}%` }}
                ></div>
              </div>
              <span>
                {analytics.counts?.neutral || 0} ({getPercentage(analytics.counts?.neutral || 0)}%)
              </span>
            </div>
            <div className="stat-row">
              <span>Negative</span>
              <div className="bar-bg">
                <div
                  className="bar-fill negative-bg"
                  style={{ width: `${getPercentage(analytics.counts?.negative || 0)}%` }}
                ></div>
              </div>
              <span>
                {analytics.counts?.negative || 0} ({getPercentage(analytics.counts?.negative || 0)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card history-card">
        <h2>Live Feed & Stream Logs</h2>
        {!analytics.history || analytics.history.length === 0 ? (
          <p className="empty-text">No sentiment logs recorded yet.</p>
        ) : (
          <div className="history-list">
            {analytics.history.map((item, index) => (
              <div key={index} className={`history-item ${item.sentiment}`}>
                <div className="item-main">
                  <p className="item-text">"{item.text}"</p>
                  <span className={`pill ${item.sentiment}`}>{item.sentiment}</span>
                </div>
                <div className="item-meta">
                  Confidence: {(item.confidence * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
