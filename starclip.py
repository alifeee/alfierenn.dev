"""
generate a star shaped clip path for use in CSS
example commmands:
  py star-clip.py -n9 -k
  py star-clip.py -n9
"""

import argparse
import math


def clip_path(points, radius, ratio, offsetangle):
    """return clip-path CSS"""
    s = ""
    s += "clip-path: polygon(\n"
    for i in range(points * 2 + 1):
        angle = math.pi / points * i + offsetangle
        if i % 2 == 0:
            x = math.cos(angle) * radius
            y = math.sin(angle) * radius
        else:
            x = math.cos(angle) * radius * ratio
            y = math.sin(angle) * radius * ratio
        s += f"  {x+50:.2f}% {y+50:.2f}%,\n"
    s += ");\n"
    return s


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
    # -k is a boolean
    parser.add_argument(
        "-k",
        "--keyframes",
        action="store_true",
        help="generate keyframes animation",
    )
    parser.add_argument(
        "-s",
        "--keyframes-steps",
        type=int,
        default=12,
        help="number of steps in keyframes animation",
    )
    args = parser.parse_args()

    points = args.points
    radius = 50
    ratio = args.ratio
    angle = args.angle / 180 * math.pi
    keyframes = args.keyframes
    keyframes_steps = args.keyframes_steps

    if keyframes:
        print("@keyframes rotate {")
        for i in range(keyframes_steps + 1):
            print(f"  {i*100/keyframes_steps:.2f}% {{")
            print(
                clip_path(
                    points, radius, ratio, angle + math.pi * 2 / keyframes_steps * i
                )
            )
            print("  }")
        print("}")
    else:
        print(clip_path(points, radius, ratio, angle))


if __name__ == "__main__":
    main()
