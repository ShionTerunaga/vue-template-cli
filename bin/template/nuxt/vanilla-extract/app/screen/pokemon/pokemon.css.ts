import { style } from "@vanilla-extract/css";

const pokemonStyle = {
    title: style({
        textAlign: "center"
    }),
    grid: style({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 24,
        justifyItems: "center"
    })
};

export default pokemonStyle;
