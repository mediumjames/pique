import csv
import json
import argparse

# Converts a Comma Seperated File to OHLC JSON
# infile is filepath for import, file delimited by commas
# outifle is filepath for the json
#### UPDATE: ADD DELIMETER OPTION ####
def CSVtoJSON(infileName, outfileName):
    with open(infileName) as infile:
        # Read input
        try:
            reader = csv.DictReader(infile)
        except:
            print('CSV located at %s could not be read' %(infileName))
            raise SystemExit

        fieldnames = ('Date', 'Open', 'High', 'Low', 'Close')

        # quick outfileName check
        if outfileName[-5:] != '.json':
            print('Appending .json to given, %s' %(outfileName))
            outfileName += '.json'

        data = {}
        i=0;
        for row in reader:
            row["Open"] = float(row["Open"])
            row["High"] = float(row["High"])
            row["Low"] = float(row["Low"])
            row["Close"] = float(row["Close"])
            data[str(i)] = row
            i += 1

        content = { "Name": "Commodity",
                    "Length": len(data),
                    "Data": data}

        outfile = open(outfileName, 'w')
        json.dump(content, outfile, sort_keys=True, indent=4, separators=(',', ': '))
        outfile.write('\n')


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Converts raw csv to more manageable OHLC json')
    parser.add_argument('infile', help='name of any comma delimited file to convert to json OHLC')
    parser.add_argument('-o', '--outfile', help='name of the json file to write to, defaults to prefix of csv')
    args = parser.parse_args()

    # if no outfile specified use infile's prefix
    if not args.outfile:
        junk = args.infile.split('.')
        junk.pop()
        args.outfile = '.'.join(junk)
        args.outfile += '.json'

    print('Converting %s to JSON...' %(args.infile))
    CSVtoJSON(args.infile, args.outfile)
    print('Done. Converted to %s' %(args.outfile))