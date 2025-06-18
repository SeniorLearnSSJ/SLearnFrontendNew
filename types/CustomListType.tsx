/**
 * Defines ListNode, DoublyLinkedList classes.
 */

export class ListNode {
  id: string;
  title: string;
  datetime: Date;
  prev: ListNode| null = null;
  next: ListNode | null = null;
  content: string
  updatedAt?: Date;
  createdById?: string | null;
  createdByUsername?: string | null;

  constructor(id: string, title: string, datetime: Date, content: string, updatedAt:Date, createdById: string, createdByUsername: string) {
    this.id = id;
    this.title = title;
    this.datetime = datetime;
    this.content = content;
    this.updatedAt = updatedAt,
    this.createdById = createdById,
    this.createdByUsername = createdByUsername
  }
}


export class DoublyLinkedList {
  head: ListNode | null = null;
  tail: ListNode | null = null;
  length: number = 0;


/**
 * Defines function to insert sets of data at end of DoublyLinkedList.
 * @param id 
 * @param title 
 * @param datetime 
 * @param content
 * @param updatedAt
 * @param createdById
 * @param createdByUsername 
 */
   insertAtEnd(id: string, title: string, datetime: Date, content: string, updatedAt:Date, createdById: string, createdByUsername: string) {
    const newNode = new ListNode(id, title, datetime, content, updatedAt, createdById, createdByUsername);

    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  /**
   * Defines function to build an array.
   * @param arr 
   */
   buildFromArray(arr: { id: string; title: string; datetime: Date, content: string, updatedAt:Date, createdById: string, createdByUsername: string }[]) {
    arr.forEach(item =>{
      const dateObj = item.datetime instanceof Date? item.datetime: new Date (item.datetime)
      this.insertAtEnd(item.id, item.title, item.datetime, item.content, item.updatedAt, item.createdById, item.createdByUsername);
    });
  }

  /**
   * Defines function to get a node by its Id.
   * @param id 
   * @returns Null
   */

  getNodeById(id: string): ListNode | null {
  let current = this.head;
  while (current !== null) {
    if (current.id === id) {
      return current;
    }
    current = current.next;
  }
  return null; 
}


}


