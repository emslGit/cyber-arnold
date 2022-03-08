with open('./utils/words.csv', 'r') as src:
  with open('./words.js', 'w') as dst:
    dst.write('exports.csv_str=\'')
    dst.write(src.read()[:-1].replace('\n', '\\r\\n'))
    dst.write('\'')

