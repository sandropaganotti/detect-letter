# predict-letter
 a web based letter detection system, (try it on heroku)[https://detect-letter.herokuapp.com/static/letters.gif].

<img src="https://detect-letter.herokuapp.com/static/letters.gif" style="text-align:center;"></img>


## Why?

I'm studying machine learning and I get bored if I don't practice what I've learned, so here we go.

## How does it works

A Flask Web App loads the classifier (I've trained offline)[https://github.com/sandropaganotti/machine-learning-exercises/blob/master/Alchemic%20Symbols.ipynb], using pickle, to prectict the letter which most likely have been drawn on a canvas 
element by the user.

