import PlayerWrapper from "server/components/PlayerWrapper";

export default class PlayerMapper {
    private static sMap: Map<Player, PlayerWrapper> = new Map();

    public static set(player: Player, wrapper: PlayerWrapper): void {
        PlayerMapper.sMap.set(player, wrapper);
    }

    public static delete(player: Player): void {
        PlayerMapper.sMap.delete(player);
    }

    public static get(player: Player): PlayerWrapper | undefined {
        return PlayerMapper.sMap.get(player);
    }
}
