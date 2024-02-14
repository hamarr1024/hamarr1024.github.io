---
title: Set的用法
date: 2024-02-12
---



## 1. Set是什么

JDK文档是最好的一手学习资料。来看看Set文档的定义

> A collection that contains `no duplicate` elements. More formally, sets contain no pair of elements e1 and e2 such that e1.equals(e2), and at most one null element. As implied by its name, this interface models the mathematical set abstraction.

Java中的Set是对数学概念上`集合`的模拟。它有如下几个特点

1. :star:不能有重复元素 （这是它最大的特点)，重复的判断标准是找不到任意两个元素e1, e2, 使得e1.equals(e2)==true

2. 可以有null元素，但是最多只能有一个

## 2. Set的操作

Set的操作其实跟Collection一样，只是实现了元素的不可重复的特性。

### 2.1 查询操作

```java
int size();
boolean isEmpty();

boolean contains(Object o);
Iterator iterator();

```

### 2.2 修改操作

```java
boolean add(E e);
boolean remove(Object o);
```

### 2.3 批量操作

```java
boolean containsAll(Collection<?> c);
boolean addAll(Collection<?> c);
boolean retainAll(Collection<?> c);
boolean removeAll(Collection<?> c);
void clear();

```

### 2.4 视图操作

```java
Object[] toArray();
<T> T[] toArray(T[] a);
```

## 3. 总结

其实没啥好总结的, 因为Set的`不可重复性`的特点是在接口文档说明中体现的，并不是新增了接口或者参数来体现的，因此光看API的话Set和Collection是一致的。

因此比较有研究价值的是后面的Set的实现类，比如HashSet, TreeSet等等。
