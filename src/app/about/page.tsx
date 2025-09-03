"use client";

import React from "react";
import { Users, Target, Award, Heart } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background text-gray-900 dark:text-foreground">
      <div className="container mx-auto p-8 space-y-20">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
              About Expense Tracker
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            We’re passionate about helping you take control of your finances
            with smart insights, detailed reports, and a clean, modern
            experience.
          </p>
        </header>

        {/* Mission */}
        <section className="bg-white dark:bg-card rounded-2xl shadow-md p-8 border border-gray-200 dark:border-border">
          <div className="flex items-center gap-4 mb-6">
            <Target className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            To democratize financial management by providing powerful, intuitive
            tools that help individuals and families make informed decisions
            about their money. We believe that everyone deserves access to
            professional-grade financial tracking without complexity.
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-md border border-gray-200 dark:border-border hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-semibold">User-Centric</h3>
              </div>
              <p className="text-muted-foreground">
                Every feature is designed with simplicity and accessibility in
                mind. You are at the heart of every decision.
              </p>
            </div>

            <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-md border border-gray-200 dark:border-border hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-semibold">Excellence</h3>
              </div>
              <p className="text-muted-foreground">
                We strive for excellence in everything, from code quality to
                performance and customer support.
              </p>
            </div>

            <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-md border border-gray-200 dark:border-border hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-semibold">Passion</h3>
              </div>
              <p className="text-muted-foreground">
                We’re passionate about financial wellness and empowering you to
                achieve your financial goals.
              </p>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">
            What Makes Us Different
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-md border border-gray-200 dark:border-border hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-4 text-orange-500">
                Smart Insights
              </h3>
              <p className="text-muted-foreground mb-6">
                Our analytics help you understand spending patterns and find
                opportunities to save more.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Automated categorization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Spending trend analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Budget recommendations
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-md border border-gray-200 dark:border-border hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-4 text-green-500">
                Privacy First
              </h3>
              <p className="text-muted-foreground mb-6">
                Your data is yours. We use bank-level encryption and never sell
                your personal info.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  End-to-end encryption
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Local data processing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  GDPR compliant
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-white dark:bg-card rounded-2xl p-10 shadow-md border border-gray-200 dark:border-border">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of users already taking control of their finances
              with Expense Tracker.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/dashboard"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition"
              >
                Start Tracking
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
