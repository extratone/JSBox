// 这里需要改楼层名，请和文件名及下面的floorId保持完全一致
// 楼层唯一标识符仅能由字母、数字、下划线组成，且不能由数字开头
// 推荐用法：第20层就用MT20，第38层就用MT38，地下6层就用MT_6（用下划线代替负号），隐藏3层用MT3h（h表示隐藏），等等
main.floors.MT15 = {
    "floorId": "MT15", // 楼层唯一标识符，需要和名字完全一致
    "title": "主塔 15 层", // 楼层中文名
    "name": "15", // 显示在状态栏中的层数
    "canFlyTo": true, // 该楼能否被楼传器飞到（不能的话在该楼也不允许使用楼传器）
    "canUseQuickShop": true, // 该层是否允许使用快捷商店
    "defaultGround": "ground", // 默认地面的图块ID（terrains中）
    "png": [], // 该层默认显示的所有图片；详细用法请查看文档“自定义素材”中的说明。
    // "color": [0,0,0,0.3], // 该层的默认画面色调。本项可不写（代表无色调），如果写需要是一个RGBA数组。
    // "weather": ["snow",5], // 该层的默认天气。本项可忽略表示晴天，如果写则第一项为"rain"或"snow"代表雨雪，第二项为1-10之间的数代表强度。
    // "bgm": "bgm.mp3", // 到达该层后默认播放的BGM。本项可忽略。
    "map": [ // 地图数据，需要是13x13，建议使用地图生成器来生成
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 0, 0, 0, 0, 88, 4, 87, 0, 0, 0, 0, 3],
        [3, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 3],
        [3, 0, 4, 4, 1, 1, 1, 1, 1, 4, 4, 0, 3],
        [3, 0, 4, 1, 1, 121, 1, 122, 1, 1, 4, 0, 3],
        [3, 0, 4, 1, 1, 28, 1, 28, 1, 1, 4, 0, 3],
        [3, 0, 4, 1, 1, 27, 1, 27, 1, 1, 4, 0, 3],
        [3, 0, 4, 4, 1, 0, 1, 0, 1, 4, 4, 0, 3],
        [3, 0, 4, 4, 1, 81, 1, 81, 1, 4, 4, 0, 3],
        [3, 0, 4, 4, 4, 0, 0, 0, 4, 4, 4, 0, 3],
        [3, 0, 4, 4, 4, 4, 83, 4, 4, 4, 4, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    "firstArrive": [ // 第一次到该楼层触发的事件

    ],
    "events": { // 该楼的所有可能事件列表
        "5,4": [
            {
                "type": "choices", "text": "\t[神秘老人,man]500经验换120攻击，要吗？",
                "choices": [
                    {
                        "text": "我要", "action": [
                            {
                                "type": "if", "condition": "status:experience>=500",
                                "true": [
                                    {"type": "setValue", "name": "status:experience", "value": "status:experience-500"},
                                    {"type": "setValue", "name": "status:atk", "value": "status:atk+120"},
                                    {"type": "hide"}
                                ],
                                "false": [
                                    "\t[神秘老人,man]你的经验不足！"
                                ]
                            }
                        ]
                    },
                    {"text": "谢谢，不用", "action": []}
                ]
            }
        ],
        "7,4": [
            {
                "type": "choices", "text": "\t[神秘老人,woman]500金币换120防御，要吗？",
                "choices": [
                    {
                        "text": "我要", "action": [
                            {
                                "type": "if", "condition": "status:money>=500",
                                "true": [
                                    {"type": "setValue", "name": "status:money", "value": "status:money-500"},
                                    {"type": "setValue", "name": "status:def", "value": "status:def+120"},
                                    {"type": "hide"}
                                ],
                                "false": [
                                    "\t[神秘老人,man]你的金币不足！"
                                ]
                            }
                        ]
                    },
                    {"text": "谢谢，不用", "action": []}
                ]
            }
        ]
    },
    "changeFloor": { // 楼层转换事件；该事件不能和上面的events有冲突（同位置点），否则会被覆盖
        "7,1": {"floorId": "MT16", "stair": "downFloor"},
        "5,1": {"floorId": "MT14", "stair": "upFloor"},
    },
    "afterBattle": { // 战斗后可能触发的事件列表
    },
    "afterGetItem": { // 获得道具后可能触发的事件列表

    },
    "afterOpenDoor": { // 开完门后可能触发的事件列表

    },
    "cannotMove": { // 每个图块不可通行的方向
        // 可以在这里定义每个点不能前往哪个方向，例如悬崖边不能跳下去
        // "x,y": ["up", "left"], // (x,y)点不能往上和左走

    },
}

