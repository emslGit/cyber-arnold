import pandas as pd

START=1
END=1297

df = pd.read_csv('german-english-word-list-1498-nouns-27900-word-list.csv', usecols= [0, 1])
de = df.iloc[START:END, 0].str.split(' ', 2, expand=True)
en = df.iloc[START:END, 1].str.split(' ', 1, expand=True)
nouns = pd.concat([de.iloc[:, :2], en.iloc[:, 0]], axis=1)
nouns.columns = ['art', 'de', 'en']
nouns.to_csv('./public/words.csv', index = False)
print(nouns)
