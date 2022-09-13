class Styles {

    static readonly box = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };

    static readonly avatar = {
        bgcolor: "76ff03",
        width: 64,
        height: 64,
    };

    static readonly photo = {
        width: 64,
        height: 64,
        objectFit: "cover",
    };

    static readonly signUp = {
        mt: 1,
        mb: 2,
    };

    static readonly form = {
        "& > *": {
            m: "0.3rem"
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    };

    static readonly submit = {
        mt: 2,
        mb: 2,
    }

    static readonly login = {
        display: "flex",
        flexDirection: "column",
    };

    static readonly photoButton = {
        display: "flex",
        width: "100%",
    }

    static readonly delete = {
        ml: 0.5,
        mr: 0.5,
    };

}

export default Styles;
