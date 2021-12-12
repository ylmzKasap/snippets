import copy
import time
import os


def format_position(positionList):
    """Takes a numeric list and turns zeros into rods (||).
    It also formats each disk with '█' (chr(9608)."""

    formattedList = copy.deepcopy(positionList)
    for i, item in enumerate(formattedList):
        for ii, subItem in enumerate(item):
            if subItem == 0:
                formattedList[i][ii] = '||'
            else:
                formattedList[i][ii] = f'_{subItem}'.center((subItem * 2) + 2, '█')
    return formattedList


def print_position(positionList):
    """Takes a formatted list and prints it by aligning the rods."""

    formattedList = format_position(positionList)

    print()
    for rowList in formattedList:
        for row in rowList:
            print(str(row).center(round(4.8 * NUMBER_OF_DISKS)), end='')
        print()
    print('-A-'.center(round(4.8 * NUMBER_OF_DISKS)),
          '-B-'.center(round(4.8 * NUMBER_OF_DISKS)), '-C-'.center(round(4.7 * NUMBER_OF_DISKS)), '\n')


def get_landing_area(positionList):
    """Takes a numeric list and returns the the length of top disks
    and the index of landing area in each rod."""

    one = [positionList[i][0] for i in range(len(positionList))]
    two = [positionList[i][1] for i in range(len(positionList))]
    three = [positionList[i][2] for i in range(len(positionList))]

    topOne, landingOne = landing_area_loop(one)
    topTwo, landingTwo = landing_area_loop(two)
    topThree, landingThree = landing_area_loop(three)

    return topOne, topTwo, topThree, landingOne, landingTwo, landingThree


def landing_area_loop(positionList):
    """A loop to shorten get_landing_area function."""

    landingArea = 0
    for row in positionList:
        if row != 0:
            return row, landingArea - 1
        landingArea += 1
    return 0, landingArea - 1


def player_move(move, positionList):
    """Checks whether the submitted move is valid and alters the position list."""

    topOne, topTwo, topThree, landingOne, landingTwo, landingThree = get_landing_area(positionList)
    topDisks = {'A': topOne, 'B': topTwo, 'C': topThree}
    landingArea = {'A': landingOne, 'B': landingTwo, 'C': landingThree}

    if len(move) == 1:
        if landingTwo == 0 or landingThree == 0:
            return 'win'
        return

    topDisk1, topDisk2 = topDisks[move[0]], topDisks[move[1]]

    if topDisk1 == 0:
        print('\n' + f'There is no disk to move in -{move[0]}-'.center(15 * NUMBER_OF_DISKS))
        return
    elif topDisk2 != 0:
        if topDisk1 > topDisk2:
            print(
                '\n' + (f"Incorrect move, {'@' * topDisk1}_{topDisk1}{'@' * topDisk1}"
                     + f" is larger than {'@' * topDisk2}_{topDisk2}{'@' * topDisk2}.").center(15 * NUMBER_OF_DISKS))
            return
    elif topDisk1 == topDisk2:
        print('\n' + 'Incorrect move, both rods are empty.'.center(15 * NUMBER_OF_DISKS))
        return

    positionList[landingArea[move[1]]][rodNumber[move[1]]] = topDisk1
    positionList[landingArea[move[0]] + 1][rodNumber[move[0]]] = 0
    return positionList

# Recursive algorithm.
def move_tower(height, from_pole, to_pole, with_pole, position=None):
    if position is None:
        position = copy.deepcopy(startingPosition)
    if height >= 1:
        move_tower(height - 1, from_pole, with_pole, to_pole, position)
        move_disk(from_pole, to_pole, position)
        move_tower(height - 1, with_pole, to_pole, from_pole, position)

def move_disk(from_p, to_p, positionList):
    playerMove = from_p + to_p
    moveResult = player_move(playerMove, positionList)
    if moveResult is None:
        raise Exception('Incorrect move.')
    global currentMoves
    currentMoves += 1
    print('\n\n' + f"Moving disk from {from_p} to  {to_p}".center(NUMBER_OF_DISKS * 15))
    print_position(positionList)
    progress = currentMoves * 100 / movesNeeded
    print('\n\n' + f"{format(progress, ',.2f')}% completed.".center(NUMBER_OF_DISKS * 15))
    time.sleep(INTERVAL)
    if progress != 100:
        os.system('cls')


if __name__ == '__main__':
    NUMBER_OF_DISKS = 7
    INTERVAL = 0.1
    movesNeeded = 2 ** NUMBER_OF_DISKS - 1
    currentMoves = 0
    disks = [i + 1 for i in range(NUMBER_OF_DISKS)]
    startingPosition = [[i, 0, 0] for i in range(NUMBER_OF_DISKS + 1)]
    possibleMoves = ['AB', 'AC', 'BA', 'BC', 'CA', 'CB']
    rodNumber = {'A': 0, 'B': 1, 'C': 2}
    move_tower(NUMBER_OF_DISKS, "A", "B", "C")
    print('\n' + f'That took {currentMoves} moves.'.center(NUMBER_OF_DISKS * 15))
    input(">>> ")

