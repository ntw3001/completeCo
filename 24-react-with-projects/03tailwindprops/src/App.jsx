// import { useState } from 'react'
import './App.css'
import Card from "./components/card.jsx"

function App() {

  return (
    <>
      <Card title="Feast of the Swan" text="You are under the swan's protection. Rest soundly, no harm can befall you here." image="/images/fajitaSwan.png"/>
      <Card title="Moist Discovery" text="Precious water! With such treasure as this, you may yet escape these halls." image="/images/moistPal.png"/>
      <Card title="Grim Slice" text="There is no time for mercy. You hope these foes will not be missed." image="/images/chopPal.png"/>
      <Card/>
    </>
  )
}

export default App
