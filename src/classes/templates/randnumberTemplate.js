function random(min, max) {
    return `{
        "pools": [
            {
                "rolls": {
                    "min": ${min},
                    "max": ${max}
                },
                "entries": [
                    {
                        "type": "item",
                        "name": "minecraft:stone",
                        "functions": [
                            {
                                "function": "set_count",
                                "count": 0
                            }
                        ]
                    }
                ]
            }
        ]
    }`;
}