---
title: "S4 Class"
description: "Basic tutorial about S4 Class: Part I"
date: "2023-10-05"
categories: ["S4 Class"]
toc: true
output: html_document
---





# S4 Class

## Introduction

When tackling specific programming challenges, we often look for the right tools to aid our solutions. Much like in the physical world where we might reach for a hammer, pliers, or tweezers depending on the task at hand, in the realm of R programming, the S4 class can be that precise tool. At times, it even resembles a Swiss army knife in its versatility. The S4 class is a mature aspect of the R environment, widely employed, particularly in bioinformatics. While it might not offer the flexibility of R6, its well-structured, organized, and elegant design makes it a go-to choice for many.

## Aplications

## Basic S4 class

The simplest class can be created in the following way:


```r
setClass(
    Class = "Person",
    slots = list(
        name = "character",
        age = "numeric"
    )
)
```

Upon execution, class is already registered in S4 system. First part is 'Person', which is the name of the class. Second important thing is 'slots'. We feeding it with a list, than contains data types of class elements. It organizes class structure.

## Class initialization - create object

Because class is already registered, we can initialize it with:


```r
person <- new("Person", name = "Ezio Accinore", age = 36)
person
```

```
## An object of class "Person"
## Slot "name":
## [1] "Ezio Accinore"
## 
## Slot "age":
## [1] 36
```

After execution, we receive structured list of previously defined slots. Simple and **elegante**.

## Generic function

First, we will start with generic function. It is 'template' which can be used by different classes:


```r
setGeneric("describe", def = function(object) standardGeneric("describe"))
```

```
## [1] "describe"
```

```r
describe
```

```
## standardGeneric for "describe" defined from package ".GlobalEnv"
## 
## function (object) 
## standardGeneric("describe")
## <environment: 0x5629ed8588a0>
## Methods may be defined for arguments: object
## Use  showMethods(describe)  for currently available ones.
```

From the executed code we can read that to check if there are any existing methods exists `showMethods(describe)` should be used. Let us do that:


```r
showMethods(describe)
```

```
## Function: describe (package .GlobalEnv)
## <No methods>
```

No methods are defined, which is not surprising as we did not defined any. Why do we need them?

## Methods

When you see the equation `24 + 32`, you instinctively understand that you're supposed to add the two numbers. This understanding comes from the fact that you've learned that the \`+\` symbol represents the **addition** operation. Think of this operation as a **method** applied to the class of real numbers.

Now, consider the expression `turtle + cow`. Without any defined context, it's unclear what the `+` operation should do with these two words. However, we can define a method for this. For instance, our method might dictate that the second word comes before the first, and they are concatenated without spaces. Therefore, `turtle + cow` would result in `cowturtle`. But remember, this is just one possible method we've defined. Methods can be as diverse and creative as we want them to be!

In the R programming language, this concept of methods allows us to define specific actions for objects of different classes. For example, after introducing a generic function like `describe`, we can specify how it should behave when applied to an object of the "Person" class.


```r
setMethod("describe", signature(object = "Person"), function(object) {
    cat(paste("This is", object@name, "who is", object@age, "years old.\n"))
})
describe(person)
```

```
## This is Ezio Accinore who is 36 years old.
```
Note, that in order to refer to elements in the *object* we are using `@`.
Now, instead of going further immediately, we can make this text just a little more fancy:


```r
setMethod("describe", signature(object = "Person"), function(object) {
    full_text <- paste(" This is", (object@name), 
                       "who is", (object@age), 
                       "years old.\n")
    nchars <- nchar(paste(" This is", object@name, "who is", object@age, "years old.\n"))
    cat(" ")
    cat(paste0(rep("x-", times = floor(nchars/2)), collapse = ""), "\n\n",
        full_text, "\n",
        paste0(rep("x-", times = floor(nchars/2)), collapse = ""), "\n")
})
```


```r
describe(person)
```

```
##  x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x- 
## 
##   This is Ezio Accinore who is 36 years old.
##  
##  x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
```

## Inheritance

Imagine holding a sturdy stick. It fits comfortably in your hand, allowing you to grip it firmly and swing it with ease. Now, let's attach a hammerhead to that stick. What do we get? A hammer. But this isn't just any hammer; it's a tool that retains the easy grip and swingability of the original stick. Here, the stick represents our base class.

By adding the hammerhead, we've essentially created a new class, the "hammer", built upon the properties of the stick. We didn't need to reinvent the way we hold or swing; we simply extended the functionality of the stick.

Now, imagine further modifying this hammer by adding an axe blade. This new tool not only inherits the grip and swing of the stick but also the hammering function of the hammer. With this one tool, you can grip, swing, hammer nails, and chop wood. This evolution of tools mirrors the concept of inheritance in object-oriented programming. We don't start from scratch every time. Instead, we specialize and build upon existing classes, creating efficient solutions for more complex challenges.

### Crafting the Derived Class

In the world of R's S4 system, this idea translates into using the contains argument in the setClass function. Let's say we have our basic Person class. Now, we want to create an Employee class that has everything a Person has, but with some added features:


```r
setClass(
  "Employee",
  slots = list(
    position = "character",
    salary = "numeric"
  ),
  contains = "Person"
)
```

So, our Employee is still a person (inherits name and age slots from Person), but with a job (position) and a paycheck (salary). Let's create this new class:


```r
employee <- new("Employee", name = "John Doe", age = 28, position = "Analyst", salary = 5000)
employee
```

```
## An object of class "Employee"
## Slot "position":
## [1] "Analyst"
## 
## Slot "salary":
## [1] 5000
## 
## Slot "name":
## [1] "John Doe"
## 
## Slot "age":
## [1] 28
```

As you can see, we have added all arguments from previously created class "Person" and new class "Employee". What is interesting, we can still use previously created method for class Person, on the class Employee. 


```r
describe(employee)
```

 x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x- 

  This is John Doe who is 28 years old.
 
 x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x- 

Since we have a new class, we can add new method of descriptions, more suitable for our new class:


```r
setMethod("describe", signature(object = "Employee"), function(object){
    full_text <- paste(" This is", object@name, 
                       "who is", object@age, 
                       "years old. He is", object@position, 
                       "and earns", object@salary, "$.\n")
    nchars <- nchar(paste(full_text))
    cat(" ")
    cat(paste0(rep("x-", times = floor(nchars/2)), collapse = ""), "\n\n",
        full_text, "\n",
        paste0(rep("x-", times = floor(nchars/2)), collapse = ""), "\n")
})

describe(employee)
```

```
##  x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x- 
## 
##   This is John Doe who is 28 years old. He is Analyst and earns 5000 $.
##  
##  x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
```
### Methods without a Generic? Not Possible!
In the S4 system, you cannot define a method without first establishing a generic function. Think of the generic function as a template or a blueprint. When you call a method, R looks for this blueprint to understand the expected behavior and then dispatches to the specific method associated with the object's class.

Let's see what happens when we try to define a method without its corresponding generic:

```r
# This will throw an error because we haven't defined a generic function for 'ncharName'
setMethod("ncharName", signature(object = "Person"), function(object){
    cat(object@name, "contains: ", nchar(object@name), "characters", "\n")
})
```

```
## Error in setMethod("ncharName", signature(object = "Person"), function(object) {: no existing definition for function 'ncharName'
```
To remedy this, we'll first set up a generic function for ncharName. In this generic, we'll also include some default behavior to be executed when a specific method for a class isn't found:

```r
setGeneric("ncharName", def = function(object){
    cat("<---Here starts the output from generic function--->\n")
    cat("Here we set the default behaviour for this generic function. \n
        It shows class then dispatches to appropriate method if such exists. \n")
    cat("Class: ", class(object), "\n")
    standardGeneric("ncharName")
})
```

[1] "ncharName"


```r
ncharName(person)
```

```
## <---Here starts the output from generic function--->
## Here we set the default behaviour for this generic function. 
## 
##         It shows class then dispatches to appropriate method if such exists. 
## Class:  Person
```

```
## Error in (function (classes, fdef, mtable) : unable to find an inherited method for function 'ncharName' for signature '"Person"'
```
Upon execution, but without method set, we receive only part defined in generic. Now, With the generic in place, we can define our method for the 'Person' class:

```r
setMethod("ncharName", signature(object = "Person"), function(object){
    cat("\n <---Here starts the output from the method--->\n")
    cat(object@name, "contains: ", nchar(object@name), "characters", "\n")
})
ncharName(person)
```

```
## <---Here starts the output from generic function--->
## Here we set the default behaviour for this generic function. 
## 
##         It shows class then dispatches to appropriate method if such exists. 
## Class:  Person 
## 
##  <---Here starts the output from the method--->
## Ezio Accinore contains:  13 characters
```
Then, when method is undefined, we will see this:

```r
ncharName(employee)
```

```
## <---Here starts the output from generic function--->
## Here we set the default behaviour for this generic function. 
## 
##         It shows class then dispatches to appropriate method if such exists. 
## Class:  Employee 
## 
##  <---Here starts the output from the method--->
## John Doe contains:  8 characters
```

## Accessors and Mutators in S4

Imagine a bank vault. You wouldn't want just anyone to access its contents or change them without oversight. Similarly, in object-oriented programming, especially with S4 classes in R, we often need controlled access to the internal data of an object. This is where accessor (getter) and mutator (setter) methods come in.
In S4, we use specific methods to get or set the values of slots:

#### **Accessor (Getter)** 
Retrieves the value of a slot *name*. 

```r
setGeneric("getName", function(object) standardGeneric("getName"))
```

```
## [1] "getName"
```

```r
setMethod("getName", "Person", function(object) {
    return(object@name)
})
```

#### **Mutator (Setter)** 
Sets a new value for a slot.

```r
setGeneric("setName", function(object, value) standardGeneric("setName"))
```

```
## [1] "setName"
```

```r
setMethod("setName", "Person", function(object, value) {
    object@name <- value
    return(object)
})
```

Getters and setters, often referred to as accessors and mutators, are methods that are manually defined by the programmer. Their primary role is to control the access and modification of an object's internal data (slots in S4 terms).

Here's why they are important:

**Encapsulation**: One of the primary principles of object-oriented programming is encapsulation, which refers to the bundling of data with the methods that operate on that data. Getters and setters allow for controlled access and modification, ensuring that the internal state of an object is always valid.

**Validation**: By using setters, you can add checks to ensure that the data being set is valid. For example, if you have a slot for age, you can ensure that negative values aren't set.

**Derived Properties**: Getters can be used to compute derived properties. For example, if you have a Person class with birthYear slot, you can have a getter for age that calculates the age based on the current year and the birth year.

**Abstraction**: By using getters and setters, you can change the internal representation of a class without affecting the code that uses the class.


## Advanced Method Dispatching
In S4, methods can be dispatched based on multiple arguments (classes), not just on the class of a single object. This allows for defining methods that behave differently depending on the classes of all their arguments.


