import { FC, memo, useCallback, useMemo, useState } from 'react';

export type TabProps = {
  key: string;
  title: string | JSX.Element;
  body: JSX.Element;
};

export type TabsProps = {
  items: TabProps[];
};

export const TabsComponent: FC<TabsProps> = memo((props: TabsProps) => {
  if (props.items.length <= 0) {
    throw new Error('Tabs need to have at least one tab');
  }

  const [activeTab, setActiveTab] = useState(props.items[0].key);

  const isThisTabActive = useCallback(
    (key: string) => {
      return activeTab === key ? 'active' : '';
    },
    [activeTab]
  );

  const handleOnChangeTab = useCallback((key: string) => {
    setActiveTab(key);
  }, []);

  const activeBody = useMemo(() => props.items.find(x => x.key === activeTab)?.body ?? <></>, [activeTab, props.items]);

  return (
    <>
      <nav className="nav nav-pills flex-row mb-4">
        {props.items.map(x => (
          <button
            key={x.key}
            className={`flex-fill text-wrap text-center nav-link ${isThisTabActive(x.key)}`}
            onClick={() => handleOnChangeTab(x.key)}
          >
            {x.title}
          </button>
        ))}
      </nav>
      {activeBody}
    </>
  );
});
