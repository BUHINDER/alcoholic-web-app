class Styles {

    static readonly box = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };

    static readonly avatar = {
        m: 1,
        bgcolor: "76ff03",
    };

    static readonly welcome = {
        mb: 1,
    };

    static readonly buhinder = {
        mb: 9,
    };

    static readonly form = {
        "& > *": {m: "0.3rem"},
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    };

    static readonly submit = {
        mt: 3,
        mb: 2,
    };

    static readonly register = {
        display: "flex",
        flexDirection: "column",
    }

}

export default Styles;
