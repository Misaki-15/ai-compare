import { useState } from "react";
import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { I18nContext, translations, type Locale } from "@/lib/i18n";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/not-found";

function App() {
  const [locale, setLocale] = useState<Locale>("zh");

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      <Router hook={useHashLocation}>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </I18nContext.Provider>
  );
}

export default App;
