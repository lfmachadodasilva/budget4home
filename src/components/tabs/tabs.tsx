import { FC, memo, useCallback, useMemo, useState } from 'react';

export type TabProps = {
  key: string;
  title: string | JSX.Element;

  body: JSX.Element;
};

export enum TabTitleSize {
  Small = 'btn-sm',
  Normal = '',
  Large = 'btn-lg'
}

export enum TabTitlePosition {
  Top = 0,
  Botton = 1
}

export type TabsProps = {
  items: TabProps[];
  titleSize?: TabTitleSize;
  titlePosition?: TabTitlePosition;
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
  const buttons = useMemo(
    () =>
      props.items.map(x => (
        <button
          key={x.key}
          className={`btn ${
            props.titleSize?.toString() ?? TabTitleSize.Normal
          } flex-fill text-wrap text-center nav-link ${isThisTabActive(x.key)}`}
          onClick={() => handleOnChangeTab(x.key)}
        >
          {x.title}
        </button>
      )),
    [isThisTabActive, handleOnChangeTab, props.titleSize, props.items]
  );

  return (
    <>
      {(props.titlePosition === undefined || props.titlePosition === TabTitlePosition.Top) && (
        <nav className="nav nav-pills flex-row mb-2">{buttons}</nav>
      )}
      {activeBody}
      {props.titlePosition === TabTitlePosition.Botton && <nav className="nav nav-pills flex-row mt-2">{buttons}</nav>}
    </>
  );
});
