import React, { Component } from "react";
import { StatusBar, Dimensions, View, Text } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Physics, CreateBox, MoveBox, CleanBoxes } from "./systems";
import { Box } from "./renderers";
import Matter from "matter-js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

export default class videoGame extends Component {
    constructor() {
        super();
    }

    render() {
        const { width, height } = Dimensions.get("window");
        const boxSize = Math.trunc(Math.max(width, height) * 0.075);

        const engine = Matter.Engine.create({ enableSleeping: true });
        const world = engine.world;
        const body = Matter.Bodies.rectangle(width / 2, -1000, boxSize, boxSize, { frictionAir: 0.021 });
        const floor = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });
        const constraint = Matter.Constraint.create({
            label: "Drag Constraint",
            pointA: { x: 1, y: 1 },
            pointB: { x: 1, y: 1 },
            length: 0.01,
            stiffness: 1,
            angularStiffness: 10
        });

        Matter.World.add(world, [body, floor]);
        Matter.World.addConstraint(world, constraint);

        return (
                <GameEngine 
                    systems={[Physics, CreateBox, MoveBox, CleanBoxes]}
                    entities={{
                        physics: { engine: engine, world: world, constraint: constraint },
                        box: { body: body, size: [boxSize, boxSize], color: "#90EE90", renderer: Box },
                        floor: { body: floor, size: [width, boxSize], color: "#90EE90", renderer: Box }
                    }}
                >

                    <StatusBar hidden={true} />

                </GameEngine>
        );
    }
}
/*<Ionicons onPress={() => this.props.navigation.navigate("screen3Sad")}
            name='ios-undo' size={35} style={{marginBottom: 120, alignSelf: 'flex-start', marginEnd: 20, color: '#ADD8E6'}}/>*/