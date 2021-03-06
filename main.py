from flask import Flask, render_template, jsonify, request
import pickle
import os
import numpy as np

app = Flask(__name__)

# load the model 
dir_path = os.path.dirname(os.path.realpath(__file__))
clf_file = open(dir_path + '/model/forest_clf_1.pkl','rb')
model = pickle.load(clf_file)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/check", methods = ['POST'])
def check():
    symbol = np.array([int(s) for s in request.form['symbol'].split('|')])
    return jsonify(
        {"response": model.predict([symbol]).tolist()}
    )

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=80)