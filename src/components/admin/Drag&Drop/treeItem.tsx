import React, { useState, forwardRef, useEffect } from "react";
import { SimpleTreeItemWrapper, TreeItemComponentProps } from "dnd-kit-sortable-tree";
import KeyValuePair from "@/shared/hooks/useKeyValuePair";

type MinimalTreeItemData = {
  value: string;
};

const TreeItem = forwardRef<HTMLDivElement, TreeItemComponentProps<MinimalTreeItemData>>(
  (props, ref) => {
    const [sample, setSample] = useState("");
    const { state, removeKeyValuePair, addKeyValuePair, updateKeyValuePair } = KeyValuePair();
    type StateMap = {
      [key: string]: string;
    };

    const handleChange = (value: string) => {
      if (!state.get(props.item.value)) {
        // console.log("add key value pair");
        addKeyValuePair(props.item.value, value);
      } else {
        // console.log("update key value pair");
        updateKeyValuePair(props.item.value, value);
      }
    }

    useEffect(() => {
      if (state.get(props.item.value)) {
        setSample(state.get(props.item.value) as string);
      }
    }, []);

    return (
      <SimpleTreeItemWrapper {...props} ref={ref}>
        <div>{props.item.value}</div>
        <input
          className="border mx-3 border-gray-300 rounded p-1 "
          placeholder="Write Your Link"
          value={sample}
          onChange={(e) => {
            setSample(e.target.value);
            handleChange(e.target.value);
          }}
        />
      </SimpleTreeItemWrapper>
    );
  }
);

// Make sure to set a display name for the component when using forwardRef
TreeItem.displayName = "TreeItem";
export default TreeItem;