from flask import Flask, render_template, jsonify
import pickle
import os
import numpy as np

app = Flask(__name__)

# load the model 
dir_path = os.path.dirname(os.path.realpath(__file__))
clf_file = open(dir_path + '/model/forest_clf_1.pkl','rb')
model = pickle.load(clf_file)

# is_symbol = model.predict([np.zeros(60 * 61)])

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/check/<string:symbol>")
def check(symbol):
    symbol = np.array([int(s) for s in symbol.split('|')])
    return jsonify(
        {"response": model.predict([symbol]).tolist()}
    )

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=80)