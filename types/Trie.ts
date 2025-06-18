
/**
 * Define class trie node
 */
export class TrieNode {
  children: { [key: string]: TrieNode };
  isWord: boolean;

  constructor() {
    this.children = {};
    this.isWord = false;
  }
}

/**
 * Defines class Trie
 */
export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isWord = true;
  }

/**
 * Defines a helper function
 * @param node Current trie node 
 * @param list Array to accumulate list of nodes
 * @param curr The word as it has been built so far
 * If current node marks end of word, this helper moves the word to the list
 * It recursively goes trough each child node and appends that child's character to curr
 * This allows the function to collect all words that start with the prefix defined by curr
 * This works becuase the Trie itself marks the end of a word with an isWord flag for its last character.
 */
private suggestHelper
(node: TrieNode, list: string[],
curr: string): void{
    if (node.isWord){
    list.push(curr);}
    for (const char in node.children){
        this.suggestHelper(node.children[char], list, curr + char);}}

       

        suggest (prefix: string): string[]{
            let node = this.root;
            let curr = "";
            for (const char of prefix){
                if (!node.children[char]){
                    return [];
                }
                node = node.children[char];
                curr += char;
            }
            const list: string[] = [];
            this.suggestHelper (node, list, curr);
            return list;
        }
    }