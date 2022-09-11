class Styles {

    static readonly card = {
        maxHeight: "27rem",
        minHeight: "27rem",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.10))",
        }
    };

    static readonly cardMedia = {
        objectFit: "cover",
        maxHeight: "15rem",
        minHeight: "15rem",
        width: "100%",
        cursor: "pointer",
    };

    static readonly cardContent = {
        flexGrow: 1,
        cursor: "pointer",
    };

}

export default Styles;
