import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TriggerSelect } from "./TriggerSelect";

/* 
Todo
1. Create a interface for the nodeType
2. Create a interface for the edge 
3. Use shadcn to create the UI


*/
export type metaData = any;
export type NodeLabel = "action" | "trigger";
export type NodeKind =
  | "price-trigger"
  | "timer-trigger"
  | "hyperliquid"
  | "backpack"
  | "lighter";

interface NodeData extends Record<string, unknown> {
  label: NodeLabel;
  kind: NodeKind;
  metadata: metaData;
}

type NodeType = Node<NodeData>;
type EdgeType = Edge;

export default function CreateWorkFlow() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes(
        (nodesSnapshot) =>
          applyNodeChanges(changes, nodesSnapshot) as NodeType[]
      ),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <TriggerSelect
        onSelect={(kind, metaData) => {
          const newNode: NodeType = {
            id: `node-${Math.random().toString(36).slice(2, 9)}`,
            position: { x: 0, y: 0 },
            data: {
              label: "trigger",
              kind,
              metadata: metaData,
            },
          };
          setNodes([...nodes, newNode]);
        }}
      />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}
