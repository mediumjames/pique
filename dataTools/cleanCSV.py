import csv
import argparse

# Converts a Comma Seperated File to OHLC JSON
# infile is filepath for import, file delimited by commas
# outifle is filepath for the json
#### UPDATE: ADD DELIMETER OPTION ####
def cleanCSV(infileName, outfileName):
    with open(infileName) as infile:
        # Read input
        try:
            reader = csv.reader(infile)
        except:
            print('CSV located at %s could not be read' %(infileName))
            raise SystemExit

        for row in reader:
            print(row)

        # quick outfileName check
        if outfileName[-4:] != '.csv':
            print('Appending .csv to given, %s' %(outfileName))
            outfileName += '.csv'

        outfile = open(outfileName, 'w')
        for row in reader:
            json.dump(row, outfile)
            outfile.write('\n')

def main():
    parser = argparse.ArgumentParser(description='Converts raw csv to more manageable clean csv')
    parser.add_argument('infile', help='name of any comma delimited file to clean')
    parser.add_argument('-o', '--outfile', help='name of the csv file to write to, defaults to prefix of csv')
    args = parser.parse_args()

    # if no outfile specified use infile's prefix
    if not args.outfile:
        junk = args.infile.split('.')
        junk.pop()
        args.outfile = '.'.join(junk)
        args.outfile += '_clean.csv'

    # make sure filename given ends in .JSON

    print('Cleaning %s...' %(args.infile))
    cleanCSV(args.infile, args.outfile)
    print('Done. Converted to %s' %(args.outfile))

if __name__ == "__main__":
    main()
