import React, { Component } from 'react';
import './App.css';
import { Evaluation } from "./cmps/Evaluation";
import Button from "@material-ui/core/es/Button";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stars: 4,
            maxStars: 5
        };
        this.delStar = this.delStar.bind(this);
        this.addStar = this.addStar.bind(this);
    }


    componentDidMount() {
        // exo 1 reduce
        const input = [
            { value: 'FR', label: "France" },
            { value: 'EN', label: "Angleterre" }
        ];

        const output = this.arrayToObject(input);
        console.log(output);

        // exo 2
        const input4 = {
            a: [
                {
                    b: "greg",
                    c: {
                        a: "greg"
                    }
                }
            ],
            b: {
                c: "greg",
                a: "sabri",
                e: "arthur",
                d: [
                    {
                        a: "reever",
                        b: {
                            a: "sabri",
                            b: "reever",
                            c: "arthur",
                        }
                    }
                ]
            },
            c: {
                c: "greg",
                a: "sabri",
                e: "arthur",
                d: [
                    {
                        a: "reever"
                    }
                ]
            }
        };
        const output4 = this.find(input4, "greg"); // ["greg", "greg", "greg", "greg"]
        // this.find(input4, "greg");
        console.log(output4);

        // exo 3
        const input3 = [
            { city: 'Paris', temp: 10 },
            { city: "Lyon", temp: 15 },
            { city: "Marseille", temp: 20 },
            { city: "Bordeaux", temp: 18 }];
        const output3 = this.temperatureAverage(input3);
        console.log(output3);


        // exo 4 Bonus
        const input2 = [1, 1, 5, 'a', '7', 'B', '3', '1', '2', 2, 10, true, false, '7', 7, 3, true, '2', 'a', 2, 2];
        const output2 = this.sortValue(input2);
        console.log(output2, 'output2 => {0: [1,1], 1: [5], 2: ["a", "a"], 3: ["7", "7"], 4: ["B"], 5: ["3"], 6: ["2", "2"], 7: [2, 2, 2], ...}');
    }


    arrayToObject(input) {
        const convertArrayToObject = (input) =>
            input.reduce((obj, item) => {
                obj[item.value] = item.label
                return obj
            }, {})
        const countryObject = convertArrayToObject(input)
        return countryObject;
    }

    find(input, name) {
        var isPlainObject = function (obj) {
            return Object.prototype.toString.call(obj) === '[object Object]';
        };
        var newArray = []
        Object.keys(input).forEach(key => {
            const isArray = input[key] instanceof Array;
            if (input[key] === name) {
                newArray = [...newArray, input[key]]
            }
            else if (isArray) {
                let myArray = input[key]
                for (let index = 0; index < myArray.length; index++) {
                    const element = this.find(input[key], name)
                    newArray.push(...element)
                }
            }
            else if (isPlainObject(input[key])) {
                const element = this.find(input[key], name)
                newArray.push(...element)
            }

        });
        return newArray
    }



    temperatureAverage(input) {
        var sum = (input.map((element) => { return element.temp }).reduce((acc, current) => { return acc + current }) / input.length).toFixed(2)
        return sum
    }

    sortValue(input) {
        var existingArray = []
        var obj = {}
        var key = 0;
        for (var i = 0; i < input.length; i++) {
            let element = input[i]
            let array = [element]
            for (var j = i + 1; j < input.length; j++) {
                if (element === input[j] && existingArray.indexOf(element) === -1) {
                    array.push(input[j])
                }
            }
            if (existingArray.indexOf(element) === -1) {
                obj[key] = array;
                key++
            }
            existingArray.push(element)
        }
        return obj;
    }

    delStar() {

        this.setState({ stars: Math.max(0, this.state.stars - 1) })
    }

    addStar() {
        this.setState({ stars: Math.min(this.state.maxStars, this.state.stars + 1) })
    }

    render() {
        const { stars } = this.state;

        return (
            <div className="App">
                <Button onClick={() => { this.delStar() }}>-</Button>

                <Evaluation maxStars={this.state.maxStars} stars={stars} />

                <Button onClick={() => { this.addStar() }}>+</Button>
            </div>

        );
    }
}

export default App;
