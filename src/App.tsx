import { useEffect, useState } from "react";
import { Store } from "tauri-plugin-store-api";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  LucideSearch,
  Users2,
} from "lucide-react"
import "./App.css";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";
import { cn } from "./lib/utils";
import { TooltipProvider } from "./components/ui/tooltip";
import { Nav } from "./components/Nav";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Separator } from "./components/ui/separator";
import { Input } from "./components/ui/input";


interface MailProps {
  navCollapsedSize: number
}

const store = new Store(".settings.dat");


function App({
  navCollapsedSize,
}: MailProps) {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [defaultLayout, setDefaultLayout] = useState<number[]>([265, 440, 655]);
  const [defaultCollapsed, setDefaultCollapsed] = useState<boolean>(false);

  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  useEffect(() => {
    async function loadLayout() {
      const layout = await store.get("layout") as number[];
      const collapsed = await store.get("collapsed") as boolean;
      if (layout) {
        setDefaultLayout(
          layout
        )
      }
      if (collapsed) {
        setDefaultCollapsed(
          collapsed
        )
      }
    }
  }, [])

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  }

  return (
    <div className="h-[100vh]">
    <TooltipProvider delayDuration={0}>

    <ResizablePanelGroup
    direction="horizontal"
    onLayout={(sizes: number[]) => {
      store.set("layout", sizes)
    }}
    className="h-100vh items-stretch"
  >
    <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            store.set("collapsed", true)
            setIsCollapsed(true)
          }}
          onExpand={() => {
            store.set("collapsed", false)
            setIsCollapsed(false)
          }}
          
          className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
        >
        <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Recents",
                label: "128",
                icon: Inbox,
                variant: "default",
              },
              {
                title: "Search",
                label: "23",
                icon: LucideSearch,
                variant: "ghost",
              },
              {
                title: "Tracks",
                label: "9",
                icon: File,
                variant: "ghost",
              },
              {
                title: "Podcasts",
                label: "",
                icon: Send,
                variant: "ghost",
              },
              {
                title: "Playlists",
                label: "23",
                icon: ArchiveX,
                variant: "ghost",
              },
            ]}
          />
           <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Settings",
                label: "972",
                icon: Users2,
                variant: "ghost",
              }
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Snugtify</h1>
              <TabsList className="ml-auto">
                <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">All mail</TabsTrigger>
                <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">Unread</TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
             stuff
            </TabsContent>
            <TabsContent value="unread" className="m-0">
             stuff
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
    </ResizablePanelGroup>

    </TooltipProvider>
    </div>
  );
}

export default App;
