function icons() {

}

icons.prototype.init = function () {
    this.icons = {
        'hero': {
            'down': {'loc': 0, 'stop': 0, 'leftFoot': 1, 'rightFoot': 3},
            'left': {'loc': 1, 'stop': 0, 'leftFoot': 1, 'rightFoot': 3},
            'right': {'loc': 2, 'stop': 0, 'leftFoot': 1, 'rightFoot': 3},
            'up': {'loc': 3, 'stop': 0, 'leftFoot': 1, 'rightFoot': 3}
        },
        'terrains': {
            'ground': 0,
            'grass': 1,
            'grass2': 2,
            'yellowWall': 3,
            'whiteWall': 4,
            'blueWall': 5,
            'snowGround': 6,
            'ground2': 7,
            'ground3': 8,
            'ground4': 9,
            'sand': 10,
            'ground5': 11,
            'yellowWall2': 12,
            'whiteWall2': 13,
            'blueWall2': 14,
            'blockWall': 15,
            'grayWall': 16,
            'white': 17,
            'ground6': 18,
            'soil': 19,
            'star': 20,
            'lava': 21,
            'ice': 22,
            'downFloor': 23,
            'upFloor': 24,
            'yellowDoor': 25,
            'blueDoor': 26,
            'redDoor': 27,
            'greenDoor': 28,
            'specialDoor': 29,
            'steelDoor': 30,
            'blueShop-left': 31,
            'blueShop-right': 32,
            'pinkShop-left': 33,
            'pinkShop-right': 34,
            'arrowUp': 35,
            'arrowDown': 36,
            'arrowLeft': 37,
            'arrowRight': 38,
            'light': 39,
            'darkLight': 40,
            'ski': 41,
            'flower': 42,
            'box': 43,
            'boxed': 44
        },
        'animates': {
            'star': 0,
            'lava': 1,
            'waterWall': 2,
            'yellowDoor': 3,
            'blueDoor': 4,
            'redDoor': 5,
            'greenDoor': 6,
            'specialDoor': 7,
            'blueWallDoor': 8,
            'yellowWallDoor': 9,
            'whiteWallDoor': 10,
            'steelDoor': 11,
            'lavaDoor': 12,
            'grayLavaDoor': 13,
            'starDoor': 14,
            'mockBlueWallDoor': 15,
            'mockYellowWallDoor': 16,
            'mockWhiteWallDoor': 17,
            'iceYellowWallDoor': 18,
            'starPortal': 19,
            'exclamation': 20,
            'portal': 21,
            'switch': 22,
            'lavaNet': 23,
            'poisonNet': 24,
            'weakNet': 25,
            'curseNet': 26,
            'downPortal': 27,
            'leftPortal': 28,
            'rightPortal': 29,
            'upPortal': 30,
            'water': 31,
        },
        'npcs': {
            'man': 0,
            'woman': 1,
            'thief': 2,
            'fairy': 3,
            'magician': 4,
            'womanMagician': 5,
            'oldMan': 6,
            'child': 7,
            'wood': 8,
            'pinkShop': 9,
            'blueShop': 10,
            'princess': 11,
            'wlt': 12,
            'wt': 13,
            'wrt': 14,
            'wl': 15,
            'wc': 16,
            'wr': 17,
            'wlb': 18,
            'wrb': 19,
            'dlt': 20,
            'dt': 21,
            'drt': 22,
            'dl': 23,
            'dc': 24,
            'dr': 25,
            'dlb': 26,
            'drb': 27,
        },
        'enemys': {
            'greenSlime': 0,
            'redSlime': 1,
            'blackSlime': 2,
            'slimelord': 3,
            'bat': 4,
            'bigBat': 5,
            'redBat': 6,
            'vampire': 7,
            'vampire2': 7,
            'vampire3': 7,
            'skeleton': 8,
            'skeletonSoilder': 9,
            'skeletonCaptain': 10,
            'ghostSkeleton': 11,
            'zombie': 12,
            'zombieKnight': 13,
            'rock': 14,
            'slimeMan': 15,
            'bluePriest': 16,
            'redPriest': 17,
            'brownWizard': 18,
            'redWizard': 19,
            'yellowGuard': 20,
            'blueGuard': 21,
            'redGuard': 22,
            'swordsman': 23,
            'soldier': 24,
            'yellowKnight': 25,
            'redKnight': 26,
            'darkKnight': 27,
            'blackKing': 28,
            'yellowKing': 29,
            'greenKing': 30,
            'blueKnight': 31,
            'goldSlime': 32,
            'poisonSkeleton': 33,
            'poisonBat': 34,
            'steelRock': 35,
            'skeletonPriest': 36,
            'skeletonKing': 37,
            'skeletonWizard': 38,
            'redSkeletonCaption': 39,
            'badHero': 40,
            'demon': 41,
            'demonPriest': 42,
            'goldHornSlime': 43,
            'redKing': 44,
            'redKing2': 44,
            'whiteKing': 45,
            'blackMagician': 46,
            'silverSlime': 47,
            'swordEmperor': 48,
            'whiteHornSlime': 49,
            'badPrincess': 50,
            'badFairy': 51,
            'grayPriest': 52,
            'redSwordsman': 53,
            'whiteGhost': 54,
            'poisonZombie': 55,
            'magicDragon': 56,
            'octopus': 57,
            'darkFairy': 58,
            'greenKnight': 59,
        },
        'items': {
            'yellowKey': 0,
            'blueKey': 1,
            'redKey': 2,
            'greenKey': 3,
            'steelKey': 4,
            'bigKey': 6,
            'redJewel': 16,
            'blueJewel': 17,
            'greenJewel': 18,
            'yellowJewel': 19,
            'redPotion': 20,
            'bluePotion': 21,
            'greenPotion': 22,
            'yellowPotion': 23,
            'sword0': 60,
            'sword1': 50,
            'sword2': 51,
            'sword3': 52,
            'sword4': 53,
            'sword5': 54,
            'shield0': 61,
            'shield1': 55,
            'shield2': 56,
            'shield3': 57,
            'shield4': 58,
            'shield5': 59,
            'book': 9,
            'fly': 12,
            'pickaxe': 45,
            'icePickaxe': 44,
            'bomb': 43,
            'centerFly': 13,
            'upFly': 15,
            'downFly': 14,
            'coin': 11,
            'snow': 41,
            'cross': 40,
            'superPotion': 29,
            'earthquake': 8,
            'poisonWine': 24,
            'weakWine': 25,
            'curseWine': 27,
            'superWine': 28,
            'knife': 42,
            'moneyPocket': 46,
            'shoes': 47,
            'hammer': 48,
            'bigFly': 35,
            'wand1': 30,
            'wand2': 31
        },
        'autotile': { // ?????????Autotile??????????????????index?????????0??????
            'autotile': 0,
            'autotile1': 0,
            'autotile2': 0,
            'autotile3': 0,
        }
    }
}

icons.prototype.getIcons = function () {
    return this.icons;
}

main.instance.icons = new icons();