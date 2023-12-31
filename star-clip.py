"""generate a star shaped clip path for use in CSS"""

import argparse
import math


def main():
    """main function"""
    parser = argparse.ArgumentParser(
        description="generate a star shaped clip path for use in CSS"
    )
    parser.add_argument(
        "-n", "--points", type=int, default=5, help="number of points in star"
    )
    parser.add_argument(
        "-r",
        "--ratio",
        type=float,
        default=0.8,
        help="radius ratio of inner to outer points",
    )
    parser.add_argument(
        "-a",
        "--angle",
        type=float,
        default=0,
        help="offset angle in degrees",
    )
    args = parser.parse_args()

    points = args.points
    radius = 50
    ratio = args.ratio
    angle = args.angle / 180 * math.pi

    print("clip-path: polygon(")
    for i in range(points * 2 + 1):
        angle = math.pi / points * i + angle
        if i % 2 == 0:
            x = math.cos(angle) * radius
            y = math.sin(angle) * radius
        else:
            x = math.cos(angle) * radius * ratio
            y = math.sin(angle) * radius * ratio
        print(f"  {x+50:.2f}% {y+50:.2f}%,")
    print(");")


if __name__ == "__main__":
    main()
