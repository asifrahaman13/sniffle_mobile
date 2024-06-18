export interface SearchResult {
  metadata: {
    agent_id: string;
    agent_type: string;
    chatVariant: string;
    intent: boolean;
    screen: string;
    text: string;
  };
  text: string;
}
