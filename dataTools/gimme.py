import json
import argparse

def gimme(obj, highs=False, lows=False, orders=None):
    with open('../data/'+obj+'.json') as infile:
        try:
            obj = json.load(infile)
        except:
            print('JSON located at %s could not be read' %(infileName))
            raise SystemExit

    output = {}
    if highs:
        output["Highs"] = {}
        if orders != None:
            for order in orders:
                output["Highs"][order] = {}
                try:
                    hind = obj["Highs"][order]
                except:
                    print("Order requested too high")
                    raise SystemExit

                for i in range(len(hind)):
                    output["Highs"][order][hind[i]] = obj["Data"][hind[i]]
        else:
            for order in obj["Highs"]:
                output["Highs"][order] = {}
                for high in obj["Highs"][order]:
                    output["Highs"][order][high] = obj["Data"][high]

    if lows:
        output["Lows"] = {}
        if orders != None:
            for order in orders:
                output["Lows"][order] = {}
                try:
                    lind = obj["Lows"][order]
                except:
                    print("Order requested too high")
                    raise SystemExit

                for i in range(len(lind)):
                    output["Lows"][order][lind[i]] = obj["Data"][lind[i]]
        else:
            for order in obj["Lows"]:
                output["Lows"][order] = {}
                for low in obj["Lows"][order]:
                    output["Lows"][order][low] = obj["Data"][low]

    return output


def main():
    parser = argparse.ArgumentParser(description='gives information about price data')
    parser.add_argument('thing', help='name of the stock/commodity')
    parser.add_argument('-or', '--orders', nargs='*', help='specifies order of high or low')
    parser.add_argument('-hi', '--highs', action="store_true", help='returns highs')
    parser.add_argument('-lo', '--lows', action="store_true", help='returns lows')

    args = parser.parse_args()

    print(json.dumps(   gimme(args.thing, highs=args.highs, lows=args.lows, orders=args.orders),
                        sort_keys=True, indent=4, separators=(',', ': ')))

if __name__ == "__main__":
    main()
