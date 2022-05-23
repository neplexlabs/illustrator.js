export class ColorUtil extends null {
    private constructor() {
        /* noop */
    }

    public static hexToRGBA(hex: string) {
        let c: string[] = hex.substring(1).split("");

        if (!/^#(([\dA-Fa-f]{3}){1,2}|([\dA-Fa-f]{4}){1,2})$/.test(hex)) {
            return new Array(4).fill("0");
        }

        switch (c.length) {
            case 3:
                c = [c[0] + c[0], c[1] + c[1], c[2] + c[2], "ff"];
                break;
            case 4:
                c = [c[0] + c[0], c[1] + c[1], c[2] + c[2], c[3] + c[3]];
                break;
            case 6:
                c = [c[0] + c[1], c[2] + c[3], c[4] + c[5], "ff"];
                break;
            case 8:
                c = [c[0] + c[1], c[2] + c[3], c[4] + c[5], c[6] + c[7]];
                break;
        }

        c = c.map((char) => parseInt(char, 16).toString());
        c[3] = (Math.round((parseInt(c[3], 10) / 255) * 100) / 100).toString();
        if (c[3] === "1") c.pop();
        return c;
    }
}
