import json
import argparse

def getPeaks(obj, order):
    highs = [];
    lows = [];
    hind = []
    lind = []
    isHighs = True
    isLows = True

    if order == 0:
        print("All data points are order 0 peaks")
        return obj

    if order == 1:
        obj["Highs"] = {}
        obj["Lows"] = {}
        for i in range(obj["Length"]):
            hind.append(str(i));
            lind.append(str(i));

    if order > 1:
        try:
            hind = obj["Highs"][str(order-1)]
        except:
            isHighs = False
            print("No order %s highs to compute from" %(str(order-1)))
        try:
            lind = obj["Lows"][str(order-1)]
        except:
            isLows = False
            print("No order %s lows to compute from" %(str(order-1)))

    # CHECK IF HIGH
    if isHighs:
        for i in range(1, len(hind)):
            present = obj["Data"][hind[i]]["High"]
            past = obj["Data"][hind[i-1]]["High"]
            if (i+1 < len(hind)):
                future = obj["Data"][hind[i+1]]["High"]

            if (present > past):
                if (i+1 < len(hind)):
                    if (present >= future):
                        highs.append(hind[i])

    # CHECK IF LOW
    if isLows:
        for i in range(1, len(lind)):
            present = obj["Data"][lind[i]]["Low"]
            past = obj["Data"][lind[i-1]]["Low"]
            if (i+1 < len(lind)):
                future = obj["Data"][lind[i+1]]["Low"]

            if (present < past):
                if (i+1 < len(lind)):
                    if (present <= future):
                        lows.append(lind[i])

    obj["Highs"][str(order)] = highs
    obj["Lows"][str(order)] = lows

    return obj

def main():
    parser = argparse.ArgumentParser(description='Computes Peaks from an OHLC json and includes them')
    parser.add_argument('infile', help='name of any json OHLC')
    parser.add_argument('order', type=int, help='Order of the peaks to compute')
    parser.add_argument('-o', '--outfile', help='name of the json file to write to, defaults to prefix of json')

    args = parser.parse_args()

    # if no outfile specified use infile's prefix
    if not args.outfile:
        junk = args.infile.split('.')
        junk.pop()
        args.outfile = '.'.join(junk)
        args.outfile += '.json'

    with open(args.infile) as infile:
        obj = json.load(infile)

        print('Computing order %s peaks in %s...' %(args.order, args.infile))
        obj = getPeaks(obj, args.order)
        outfile = open(args.outfile, 'w')
        json.dump(obj, outfile, sort_keys=True, indent=4, separators=(',', ': '))
        print('Done. Computed and Included order %s peaks to %s' %(args.order,args.outfile))

if __name__ == "__main__":
    main();
