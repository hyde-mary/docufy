import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditorStore } from "@/stores/editor-store";
import { Plus, PlusCircle, X } from "lucide-react";
import React, { Fragment } from "react";

const EditorToolbarSidebar = () => {
  const {
    data,
    addTextSection,
    updateTextSection,
    removeTextSection,
    addLinkSection,
    updateLinkSection,
    removeLinkSection,
    addDropdownSection,
    updateDropdownSection,
    removeDropdownSection,
    addItemToDropdown,
    updateItemInDropdown,
    removeItemFromDropdown,
  } = useEditorStore();

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2">
        <p className="text-xs text-muted-foreground">
          Here you can edit the sidebar for you documentation. Your sidebar is
          located at the <span className="underline font-bold">left</span> and
          typically contains all the sections for your documentation
        </p>
      </div>

      {/* sidebar Sections */}
      <div className="flex flex-col gap-y-4">
        <Label className="font-medium text-sm">Sidebar Sections</Label>
        {data.sections.map((section, index) => (
          <div key={index} className="flex gap-2 items-center">
            {/* TEXT SECTION */}
            {section.type === "text" && (
              <Fragment>
                <Input
                  placeholder="Section Name"
                  value={section.name}
                  onChange={(e) =>
                    updateTextSection(index, {
                      ...section,
                      name: e.target.value,
                    })
                  }
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTextSection(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </Fragment>
            )}

            {/* LINK SECTION */}
            {section.type === "link" && (
              <Fragment>
                <Input
                  placeholder="Link Name"
                  value={section.name}
                  onChange={(e) =>
                    updateLinkSection(index, {
                      ...section,
                      name: e.target.value,
                    })
                  }
                  className="flex-1"
                />
                <Input
                  placeholder="Link URL"
                  value={section.href}
                  onChange={(e) =>
                    updateLinkSection(index, {
                      ...section,
                      href: e.target.value,
                    })
                  }
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLinkSection(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </Fragment>
            )}

            {/* DROPDOWN SECTION */}
            {/* {section.type === "dropdown" && (
              <Fragment>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Dropdown Name"
                    value={section.name}
                    onChange={(e) =>
                      updateDropdownSection(index, {
                        ...section,
                        name: e.target.value,
                      })
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDropdownSection(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-col gap-2">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex flex-col sm:flex-row gap-2"
                    >
                      <Input
                        placeholder="Item Name"
                        value={item.name}
                        onChange={(e) =>
                          updateItemInDropdown(index, itemIndex, {
                            ...item,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Item URL"
                        value={item.href}
                        onChange={(e) =>
                          updateItemInDropdown(index, itemIndex, {
                            ...item,
                            href: e.target.value,
                          })
                        }
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItemFromDropdown(index, itemIndex)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addItemToDropdown(index)}
                  className="mt-2 flex items-center gap-2 self-start"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
              </Fragment>
            )} */}

            {section.type === "dropdown" && (
              <Fragment>
                <div className="flex flex-col w-full gap-2">
                  <div className="flex items-center w-full gap-2">
                    <Input
                      placeholder="Dropdown Name"
                      value={section.name}
                      onChange={(e) =>
                        updateDropdownSection(index, {
                          ...section,
                          name: e.target.value,
                        })
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDropdownSection(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-col gap-2">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex flex-col sm:flex-row gap-2"
                      >
                        <Input
                          placeholder="Item Name"
                          value={item.name}
                          onChange={(e) =>
                            updateItemInDropdown(index, itemIndex, {
                              ...item,
                              name: e.target.value,
                            })
                          }
                        />
                        <Input
                          placeholder="Item URL"
                          value={item.href}
                          onChange={(e) =>
                            updateItemInDropdown(index, itemIndex, {
                              ...item,
                              href: e.target.value,
                            })
                          }
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            removeItemFromDropdown(index, itemIndex)
                          }
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="w-full flex items-center justify-start">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addItemToDropdown(index)}
                      className="flex items-center gap-2 self-start"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Item
                    </Button>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        ))}

        {/* add section button */}
        {data.sections.length < 20 && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={addTextSection}
              size="sm"
              className="flex flex-1 items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Text
            </Button>
            <Button
              variant="outline"
              onClick={addLinkSection}
              size="sm"
              className="flex flex-1 items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Link
            </Button>
            <Button
              variant="outline"
              onClick={addDropdownSection}
              size="sm"
              className="flex flex-1 items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Dropdown
            </Button>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Here you can add sections for your documentation.
        </p>
      </div>
    </div>
  );
};

export default EditorToolbarSidebar;
