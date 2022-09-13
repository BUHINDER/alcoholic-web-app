class UUIDUtil {

    static readonly nullUUID = "00000000-0000-0000-0000-000000000000"

    static isNullUUID(uuid: string): boolean {
        return uuid === this.nullUUID
    }

}

export default UUIDUtil;
