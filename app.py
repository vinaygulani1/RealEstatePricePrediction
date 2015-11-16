from flask import Flask, render_template, jsonify,send_from_directory
from stock_scraper import get_data, get_missing_data_plot,get_knn_plot,get_lasso_plot,get_linear_regression_plot,get_predictor_plot
import os

app = Flask(__name__)
# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='')

@app.route("/data")
def data():
    return jsonify(get_data())

"""
All plotting APIs
"""

@app.route("/get_missing_data_plot")
def getmissingdataplot():
    return get_missing_data_plot()
 
@app.route("/get_knn_plot")
def getknnplot():
    return get_knn_plot()
 
 
@app.route("/get_lasso_plot")
def getlassoplot():
    return get_lasso_plot()
 
@app.route("/get_predictor_plot")
def getpredictorplot():
    return get_predictor_plot()
 
@app.route("/get_linear_regression_plot")
def getlinearregressionplot():
    return get_linear_regression_plot()

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port)
    


