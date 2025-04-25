
/**
 * Applies a custom color palette to CSS variables.
 *
 * @param {Object} palette - An object where keys are variable names and values are CSS color strings.
 * @param {Object} [options] - Configuration options.
 * @param {string} [options.prefix=""] - A prefix to be added to each CSS variable name followed by "-". If no prefix is
 * provided, the resulting css variable with be the key preceded by "--".
 *
 * @example
 * setCustomColors({ teal: '#00f5e1', orange: '#ff9900' }, { prefix: "custom" });
 * // Generates: --custom-teal: #00f5e1; --custom-orange: #ff9900
 *
 * // Use in CSS:
 * // background-color: var(--custom-teal);
 * // color: var(--custom-orange);
 */
export function setCustomColors(palette, { prefix = "" } = {}) {
    const root = document.documentElement;

    Object.entries(palette).forEach(([key, value]) => {
        if (value != null) {
            const variableName = prefix ? `--${prefix}-${key}` : `--${key}`;
            root.style.setProperty(variableName, value);
        }
    });
}



export const ONEColors = {

    teal0 : "#17858C",
    teal1: "#1A9BA3",
    teal2: "#4DAEB4",
    teal3: "#80C0C4",
    teal4: "#9ACACD",
    teal5: "#B3D3D5",
    teal6: "#DAE6E7",
    teal7: "#E0E6E6",

    orange0: "#FF5E1F",
    orange1: "#FF7F4C",
    orange2: "#FF9970",
    orange3: "#FFA785",
    orange4: "#FFB699",
    orange5: "#FFC5AD",
    orange6: "#FFD4C2",
    orange7: "#FFE2D6",

    purple0: "#661450",
    purple1: "#73175A",
    purple2: "#991E79",
    purple3: "#BB2593",
    purple4: "#D733AB",
    purple5: "#DD55B9",
    purple6: "#E477C7",
    purple7: "#EB99D5",

    navy0: "#081248",
    navy1: "#0C1B6E",
    navy2: "#102493",
    navy3: "#142DB8",
    navy4: "#1836DC",
    navy5: "#3550E9",
    navy6: "#5A70ED",
    navy7: "#A3AFF5",

    yellow0: "#F5BE29",
    yellow1: "#F7CE5B",
    yellow2: "#F9D677",
    yellow3: "#F9DC8A",
    yellow4: "#FAE29E",
    yellow5: "#FBE7B1",
    yellow6: "#FCEDC5",
    yellow7: "#FDF3D8",

    burgundy0: "#7A0018",
    burgundy1: "#A20021",
    burgundy2: "#CC0029",
    burgundy3: "#F50031",
    burgundy4: "#FF1F4B",
    burgundy5: "#FF476C",
    burgundy6: "#FF859D",
    burgundy7: "#FFADBE",

    blue0: "#7ECBF1",
    blue1: "#A3DAF5",
    blue2: "#D1EDFA",
    blue3: "#E8F6FD",
    blue4: "#F4FBFE",

    red0: "#ED8282",
    red1: "#F2A6A6",
    red2: "#F9D3D3",
    red3: "#FCE9E9",
    red4: "#FEF4F4",

    grey0: "#000000",
    grey1: "#AAAAAA",
    grey2: "#CBC9C9",
    grey3: "#E5E5E5",
    grey4: "#FFFFFF"

};

export const mainColor = {
    teal: ONEColors.teal1
}

export const secondaryColors = {
    orange: ONEColors.orange1,
    navy: ONEColors.navy0,
    purple: ONEColors.purple1,
    blue: ONEColors.blue1,
    yellow: ONEColors.yellow1
}

export const ONEPalette = {
    ...mainColor,
    ...secondaryColors
}

export const greyScale = {
    black: ONEColors.grey0,
    darkGrey: ONEColors.grey1,
    midGrey: ONEColors.grey2,
    lightGrey: ONEColors.grey3,
    white: ONEColors.grey4
}

export function applyONEPalette() {
    setCustomColors(ONEPalette, {prefix: "one-data"});
    setCustomColors(greyScale, {prefix: "one-data"});
}