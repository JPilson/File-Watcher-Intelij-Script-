# File Watcher IntelliJ/Webstorm Script

Set of scripts to be run when target File Changes
___

## 1 Icon Import

When working with custom SVG I often need to copy the svg to my desired folder and  
and the register the icon somehow so that I could have auto complete on my icons component (Vue).
To mitigate the tedeous workflow , this script let your IDE do it for you.

- Your target directory (folder where icons resides) changes (by adding, or renaming an icon)
- The IDE runs the script specified in the FileWatchers Setting
- The script check for a new Icon and then adds it to your registry icon back (eg:icons.json)
- The registry can later on be used as type

```typesript 
export type IIconName = keyof typeof IconRegistry
```

To know more about File Watcher Please check
this [File Watchers](https://www.jetbrains.com/help/idea/using-file-watchers.html).

### Script Environment

| P           | V                  | Description                                                                                |
|-------------|--------------------|--------------------------------------------------------------------------------------------|
| environment | Deno               | The Script was made using Deno APIs so you can only run in a Deno environment              |
| scrips arg  | WORK_DIR           | Absolut path of your project. eg: `"Users/user1/WebstormProjects/myProject/src/icons"`     |
| scrips arg  | ICON_DIR_NAME      | Relative Path to folder that holds the svgs files eg: `files`; `files/icons`               |
| scrips arg  | ICON_REGISTRY_NAME | Relative Path + name of the json file registry    eg:`registry.json` : `dir/registry.json` |

#### Example with File Watcher
![File Watcher Example](./iconImport/Screenshot%202025-01-31%20at%2013.14.44.png)



