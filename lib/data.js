
// level 1
import takbir from "../public/games/gerakan/takbir.png";
import sujud from "../public/games/gerakan/sujud.png";
import ruku from "../public/games/gerakan/ruku.png";
import tasyahud1 from "../public/games/gerakan/tasyahud.png";
import sujud2 from "../public/games/gerakan/sujud2.png";
import takbir2 from "../public/games/gerakan/takbir2.png";
import ruku2 from "../public/games/gerakan/ruku2.png";
import tasyahud2 from "../public/games/gerakan/tasyahud2.png";

import hikmah from "../public/games/hisa/1.png";
import hikmah2 from "../public/games/hisa/2.png";
import iffah from "../public/games/hisa/7.png";
import iffah2 from "../public/games/hisa/8.png";
import syajaah from "../public/games/hisa/3.png";
import syajaah2 from "../public/games/hisa/4.png";
import adalah from "../public/games/hisa/5.png";
import adalah2 from "../public/games/hisa/6.png";

// level 3
import ashar from "../public/games/waktu/ashar.png";
import dzuhur from "../public/games/waktu/dzuhur.png";
import subuh from "../public/games/waktu/subuh.png";
import isya from "../public/games/waktu/isya.png";
import magrib from "../public/games/waktu/magrib.png";
import pashar from "../public/games/waktu/pashar.png";
import pdzuhur from "../public/games/waktu/pdzuhur.png";
import psubuh from "../public/games/waktu/pshubuh.png";
import pisya from "../public/games/waktu/pisya.png";
import pmagrib from "../public/games/waktu/pmagrib.png";

export const GameResources = [
    {
        level: "Gerakan Shalat",
        cards: [
            {
                cardId: 1,
                matched: false,
                name: "sujud",
                src: sujud,
                color: "blue",
            },
            {
                cardId: 2,
                matched: false,
                name: "ruku",
                src: ruku,
                color: "blue",
            },
            {
                cardId: 3,
                matched: false,
                name: "takbir",
                src: takbir,
                color: "blue",
            },
            {
                cardId: 4,
                matched: false,
                name: "takbir",
                src: takbir2,
                color: "green",
            },
            {
                cardId: 5,
                matched: false,
                name: "sujud",
                src: sujud2,
                color: "green",
            },
            {
                cardId: 6,
                matched: false,
                name: "ruku",
                src: ruku2,
                color: "green",
            },
            {
                cardId: 66,
                matched: false,
                name: "tasyahud",
                src: tasyahud1,
                color: "green",
            },
            {
                cardId: 655,
                matched: false,
                name: "tasyahud",
                src: tasyahud2,
                color: "blue",
            },
        ],
    },
    {
        level: "Hikmah",
        cards: [
            {
                cardId: 1,
                matched: false,
                name: "hikmah",
                src: hikmah,
                color: "orange",
            },
            {
                cardId: 2,
                matched: false,
                name: "hikmah",
                src: hikmah2,
                color: "violet",
            },
            {
                cardId: 3,
                matched: false,
                name: "iffah",
                src: iffah,
                color: "orange",
            },
            {
                cardId: 4,
                matched: false,
                name: "iffah",
                src: iffah2,
                color: "violet",
            },
            {
                cardId: 5,
                matched: false,
                name: "syajaah",
                src: syajaah,
                color: "orange",
            },
            {
                cardId: 6,
                matched: false,
                name: "syajaah",
                src: syajaah2,
                color: "violet",
            },
            {
                cardId: 7,
                matched: false,
                name: "adalah",
                src: adalah,
                color: "orange",
            },
            {
                cardId: 8,
                matched: false,
                name: "adalah",
                src: adalah2,
                color: "violet",
            }
        ]
    },
    // {
    //     level: "Bacaan Shalat",
    //     cards: [
    //         {
    //             cardId: 7,
    //             matched: false,
    //             name: "takbir",
    //             src: takbirb,
    //         },
    //         {
    //             cardId: 8,
    //             matched: false,
    //             name: "rukub",
    //             src: rukub,
    //         },
    //         {
    //             cardId: 9,
    //             matched: false,
    //             name: "sujudb",
    //             src: sujudb,
    //         },
    //         {
    //             cardId: 10,
    //             matched: false,
    //             name: "duduk",
    //             src: duduk,
    //         },
    //         {
    //             cardId: 11,
    //             matched: false,
    //             name: "iftitah",
    //             src: iftitah,
    //         },
    //         {
    //             cardId: 12,
    //             matched: false,
    //             name: "tasyahud",
    //             src: tasyahud,
    //         },
    //         {
    //             cardId: 13,
    //             matched: false,
    //             name: "itidal",
    //             src: itidal,
    //         },
    //         {
    //             cardId: 14,
    //             matched: false,
    //             name: "takbir",
    //             src: btakbir,
    //         },
    //         {
    //             cardId: 14,
    //             matched: false,
    //             name: "rukub",
    //             src: bruku,
    //         },
    //         {
    //             cardId: 15,
    //             matched: false,
    //             name: "sujudb",
    //             src: bsujud,
    //         },
    //         {
    //             cardId: 16,
    //             matched: false,
    //             name: "duduk",
    //             src: bduduk,
    //         },
    //         {
    //             cardId: 17,
    //             matched: false,
    //             name: "iftitah",
    //             src: biftitah,
    //         },
    //         {
    //             cardId: 18,
    //             matched: false,
    //             name: "tasyahud",
    //             src: btasyahud,
    //         },
    //         {
    //             cardId: 19,
    //             matched: false,
    //             name: "itidal",
    //             src: bitidal,
    //         },
            
    //     ],
    // },
    {
        level: "Waktu Shalat",
        cards: [
            {
                cardId: 7,
                matched: false,
                name: "ashar",
                src: ashar,
            },
            {
                cardId: 8,
                matched: false,
                name: "dzuhur",
                src: dzuhur,
            },
            {
                cardId: 9,
                matched: false,
                name: "subuh",
                src: subuh,
            },
            {
                cardId: 10,
                matched: false,
                name: "isya",
                src: isya,
            },
            {
                cardId: 11,
                matched: false,
                name: "magrib",
                src: magrib,
            },
            {
                cardId: 12,
                matched: false,
                name: "ashar",
                src: pashar,
            },
            {
                cardId: 13,
                matched: false,
                name: "dzuhur",
                src: pdzuhur,
            },
            {
                cardId: 14,
                matched: false,
                name: "subuh",
                src: psubuh,
            },
            {
                cardId: 15,
                matched: false,
                name: "isya",
                src: pisya,
            },
            {
                cardId: 16,
                matched: false,
                name: "magrib",
                src: pmagrib,
            },
        ],
    },
];
