import { CharacterCaretaker } from "../../lib/Character"
import { MovieCaretaker } from "../../lib/Movie"

export type MongoCollections = "Character" | "Movies";
export type Caretakers = CharacterCaretaker | MovieCaretaker