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

@app.route("/knndata")
def get_knn_data():
    xs = [1, 5, 10, 25, 50]
    ys_remove = [53237.9329566,45209.7125948,45960.5608356,48585.3941053,52868.8219684]
    ys_mean = [78259.1829037,68398.7744757,68553.5061504,71210.8411428,73907.104319]
    ys_em = [73183.8356913,62981.6363301,63364.5720675,65266.4795907,67519.626988]
    return render_template("knndata.html",categories= xs, 
                            series_data_miss= ys_remove,series_data_replaced = ys_mean,
                            series_data_estimated = ys_em)

@app.route("/missingdata")
def get_missing_data():
    import pdb
    #pdb.set_trace()
    values = [276, 1492, 1944, 3531, 5276]
    key = range(0,len(values))
    missingdata = []
    for i in range(0,len(key)): 
        missingdata.append({"key":key[i],"value":values[i]})
    print missingdata
    return render_template("missingdata.html",json_gainer=missingdata,json_loser=missingdata)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5050))
    app.run(host='127.0.0.1', port=port)
    


