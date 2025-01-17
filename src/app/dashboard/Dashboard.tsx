"use client";

import { useState, Suspense } from "react";
import { Header } from "./components/header/Header";
import { Sidebar } from "./components/siderbar/Siderbar";
import Login from "./components/login/Login";
import { useUser } from "./hooks";
import {
  Products,
  Sales,
  ProductsStar,
  Categories,
  Contact,
  Banner,
  Attributes,
  Carousel,
  Users,
  Gallery,
} from "./views";
import { User } from "./hooks/useUser";

enum Views {
  Sales = 1,
  ProductsStar,
  Carousel,
  Categories,
  Products,
  Contact,
  Attributes,
  Users,
  Banner,
  Gallery,
}

function ProtectedRoute({
  user,
  children,
}: {
  user?: User;
  children: JSX.Element;
}) {
  return !user ? <Login /> : children;
}

function DashBoard() {
  const [view, setView] = useState<Views>(Views.Sales);
  const { user } = useUser();

  const renderView = () => {
    switch (view) {
      case Views.Sales:
        return <Sales />;
      case Views.ProductsStar:
        return <ProductsStar />;
      case Views.Carousel:
        return <Carousel />;
      case Views.Categories:
        return <Categories />;
      case Views.Products:
        return <Products />;
      case Views.Contact:
        return <Contact />;
      case Views.Banner:
        return <Banner />;
      case Views.Attributes:
        return <Attributes />;
      case Views.Users:
        return <Users />;
      case Views.Gallery:
        return <Gallery />;
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute user={user}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar view={view} setView={setView} />
        <main className="flex-1 overflow-auto">
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <div className="p-8">{renderView()}</div>
          </Suspense>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default DashBoard;
